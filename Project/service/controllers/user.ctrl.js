const User = require('../models/user');
const Plant = require('../models/plants');
const bcrypt = require("bcrypt");

exports.userDBController = {
    getUsers(req, res) {
        if (req.query.first_name) {
            User.find({ first_name: `${req.query.first_name}` })
                .then(docs => { res.json(docs) })
                .catch(err => console.log(`Error getting the data from DB: ${err}`));
        }
        else if (req.query.email) {
            User.find({ email: `${req.query.email}` })
                .then(docs => { res.json(docs) })
                .catch(err => console.log(`Error getting the data from DB: ${err}`));
        }
        else {
            User.find({})
                .then(docs => { res.json(docs) })
                .catch(err => console.log(`Error getting the data from DB: ${err}`));
        }
    },
    getUser(req, res) {
        User.findOne({ id: parseInt(req.params.id) })
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error getting the data from DB: ${err}`));
    },
    async addUser(req, res) {
        const index = await new Promise((resolve, reject) => {
            const index = User.findOne({}).sort({ _id: -1 }).limit(1);
            resolve(index);
        });
        const newUser = new User({
            "id": index.id + 1,
            "first_name": req.body.first_name,
            "last_name": req.body.last_name,
            "email": req.body.email,
            "password": bcrypt.hashSync(req.body.password, 10),
            "my_favorites": req.body.my_favorites
        });
        newUser.save()
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error getting the data from DB: ${err}`));
    },
    updateUserOrAddToFavorites(req, res) {
        User.find({ id: parseInt(req.params.id) })
            .then(docs => {
                // need to work on dynamic id in my_favorites
                const index = () => docs[0].my_favorites.findOne({}).sort({ id: -1 }).limit(1);
                // const Favorites = docs[0].my_favorites;
                // const favLen = Favorites.length;
                const plantName = req.query.name;
                // let i = 0;
                // for(i; i<favLen; i++) {
                //     if(plantName == Favorites[i].plant_name) {
                //         res.send('This plant is already added in your favorites');
                //         break;
                //     }
                // }
                // if(i == favLen){
                Plant.findOne({ name: plantName })
                    .then((docs) => {
                        if (docs != null) {
                            const id = index().id + 1;
                            const plant_name = docs.name;
                            const description = docs.description;
                            const image_url = docs.image_url;
                            const date = '28.01.2020';
                            User.updateOne({ id: parseInt(req.params.id) }, { $push: { "my_favorites": { id: id, plant_name: plant_name, description: description, image_url: image_url, date: date } } })
                                .then(docs => { console.log(docs) })
                                .catch(err => console.log(`Error getting the data from DB: ${err}`));
                        }
                        else {
                            res.send('Plant not found');
                        }
                        res.json(docs);
                    })
                    .catch((err) => console.log(`Error getting the data from DB: ${err}`));
                // }
            })
            .catch(err => console.log(`Error: ${err}`));
    },
    deleteUserOrFavoritePlant(req, res) {
        if (req.query.name) {
            User.find({ id: parseInt(req.params.id) })
                .then(docs => {
                    const fav = docs[0].my_favorites;
                    const favLen = fav.length;
                    for (let i = 0; i < favLen; i++) {
                        if (fav[i].plant_name == req.query.name) {
                            User.updateOne({ id: parseInt(req.params.id) }, { $pull: { "my_favorites": { plant_name: fav[i].plant_name } } })
                                .then(docs => { res.json(docs) })
                                .catch(err => console.log(`Error getting the data from DB: ${err}`));
                            break;
                        }
                    }
                })
        }
        else {
            User.findOneAndDelete({ id: parseInt(req.params.id) })
                .then(docs => { res.json(docs) })
                .catch(err => console.log(`Error getting the data from DB: ${err}`));
        }
    }
};