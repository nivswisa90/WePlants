const User = require('../models/user');
const Plant = require('../models/plants');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

exports.userDBController = {
    getUsers(req, res) {
        const token = req.cookies.token;
        if (token) {
            jwt.verify(token, 'jwtSecret', async (err, decoded) => {
                if (err) {
                    res.json({ auth: false, message: 'authentication problem' })
                } else {
                    res.json({ id: decoded.id });
                }
            })
        }
        else if (req.query.first_name) {
            User.find({ first_name: `${req.query.first_name}` })
                .then(docs => { res.json(docs) })
                .catch(err => console.log(`Error getting the data from DB: ${err}`));
        }
        else if (req.query.email) {
            User.findOne({ email: `${req.query.email}` })
                .then(docs => {
                    const first_name = docs.first_name;
                    const last_name = docs.last_name;
                    const my_favorites = docs.my_favorites;
                    // if(!bcrypt.compareSync(req.body.password, docs.password)){
                    //     res.json('Wrong password');
                    // } 
                    // else{
                    //     res.json(docs);
                    // }
                    res.json({ first_name, last_name, my_favorites });
                })
                .catch(err => console.log(`Error getting the data from DB: ${err}`));
        }
        else {
            const token = req.cookies.token;

            if (!token) {
                res.send('Token is missing');
            } else {
                jwt.verify(token, 'jwtSecret', (err, decoded) => {
                    if (err) {
                        res.json({ auth: false, message: 'authentication problem' })
                    } else {
                        req.userId = decoded.id;
                        User.findOne({ id: decoded.id })
                            .then(docs => {
                                const first_name = docs.first_name;
                                const last_name = docs.last_name;
                                const my_favorites = docs.my_favorites; //Change to camelCase
                                res.json({ first_name, last_name, my_favorites });
                            })
                            .catch(err => console.log(`Error getting the data from DB: ${err}`));
                    }
                })
                // User.find({})
                //     .then(docs => { res.json(docs) })
                //     .catch(err => console.log(`Error getting the data from DB: ${err}`));
            }
        }
    },
    getUser(req, res) {
        // console.log(parseInt(req.params.id));
        // User.findOne({ id: parseInt(req.params.id) })
        //     .then(docs => {
        //         const first_name = docs.first_name;
        //         const last_name = docs.last_name;
        //         const my_favorites = docs.my_favorites; //Change to camelCase
        //         res.json({ first_name, last_name, my_favorites });
        //     })
        //     .catch(err => console.log(`Error getting the data from DB: ${err}`));
        const token = req.cookies.token;
        if (!token) {
            res.send('Token is missing');
        } else {
            jwt.verify(token, 'jwtSecret', (err, decoded) => {
                if (err) {
                    res.json({ auth: false, message: 'authentication problem' })
                } else {
                    req.userId = decoded.id;
                    User.findOne({ id: parseInt(req.params.id) })
                        .then(docs => {
                            const first_name = docs.first_name;
                            const last_name = docs.last_name;
                            const my_favorites = docs.my_favorites; //Change to camelCase
                            res.json({ first_name, last_name, my_favorites });
                        })
                        .catch(err => console.log(`Error getting the data from DB: ${err}`));
                }
            })
        }
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
    async login(req, res) {
        User.findOne({ email: req.params.email })
            .then(docs => {
                if (docs) {
                    if (!bcrypt.compareSync(req.body.password, docs.password)) {
                        res.json('Wrong password');
                    }
                    else {
                        const id = docs.id;
                        // const first_name = docs.first_name;
                        // const last_name = docs.last_name;
                        // const my_favorites = docs.my_favorites;
                        const token = jwt.sign({ id }, "jwtSecret", {
                            expiresIn: 60
                        });
                        res.cookie('token', token);
                        res.json({ token });
                    }
                }
                else {
                    res.json('User does not exist');
                }

            })
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