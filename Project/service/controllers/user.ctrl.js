const User = require('../models/user');
const Plant = require('../models/plants');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const moment = require('moment');

const getUserId = (req, res) => {
    const token = req.cookies.token;
    let id;
    if (!token) {
        return;
    } else {
        jwt.verify(token, 'jwtSecret', (err, decoded) => {
            if (err) {
                res.json({ auth: false, message: 'authentication problem' })
            } else {
                id = decoded.id;
            }
        })
    }
    return id;
};

exports.userDBController = {
    getUsers(req, res) {
        const id = getUserId(req, res);
        if (id) {
            res.json({ id });
        }
        else {
            User.find({})
                .then(docs => res.send(docs))
                .catch(err => console.log(err));
        }
    },
    getUser(req, res) {
        const id = getUserId(req, res);

        if (id != parseInt(req.params.id)) {
            res.send('Authentication error');
        } else {
            User.findOne({ id })
                .then(docs => {
                    const firstName = docs.firstName;
                    const lastName = docs.lastName;
                    const myFavorites = docs.myFavorites; //Change to camelCase
                    res.json({ id, firstName, lastName, myFavorites });
                })
                .catch(err => console.log(`Error getting the data from DB: ${err}`));
        }

    },
    async addUser(req, res) {
        const index = await new Promise((resolve, reject) => {
            const index = User.findOne({}).sort({ _id: -1 }).limit(1);
            resolve(index);
        });
        const newUser = new User({
            "id": index.id + 1,
            "firstName": req.body.firstName,
            "lastName": req.body.lastName,
            "email": req.body.email,
            "password": bcrypt.hashSync(req.body.password, 10),
            "myFavorites": req.body.myFavorites
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
                        const token = jwt.sign({ id }, "jwtSecret", {
                            expiresIn: 3600
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
    async updateUserOrAddToFavorites(req, res) {
        const userId = getUserId(req, res);

        if (userId != parseInt(req.params.id)) {
            res.send('Authentication error');
        }
        else {
            User.find({ id: userId })
                .then(async docs => {
                    const max = docs[0].myFavorites.reduce((prev, curr) => prev = prev > docs[0].myFavorites.id ? prev : curr.id, 0);
                    // const plantName = req.query.name;
                    const plantId = req.query.plantId;

                    Plant.findOne({ id: plantId })  //Need to change to plant id
                        .then((docs) => {
                            if (docs != null) {
                                const id = max + 1;
                                const plantName = docs.plantName;
                                const description = docs.description;
                                const imageUrl = docs.imageUrl;
                                const date = moment().format('DD/MM/YYYY');
                                User.updateOne({ id: parseInt(req.params.id) }, { $push: { "myFavorites": { id: id, plantName: plantName, description: description, imageUrl: imageUrl, date: date } } })
                                    .then(docs => { console.log(docs) })
                                    .catch(err => console.log(`Error getting the data from DB: ${err}`));
                            }
                            else {
                                res.send('Plant not found');
                            }
                            res.json(docs);
                        })
                        .catch((err) => console.log(`Error getting the data from DB: ${err}`));
                })
                .catch(err => console.log(`Error: ${err}`));
        }
    },
    deleteUserOrFavoritePlant(req, res) {
        const userId = getUserId(req, res);

        if (userId == parseInt(req.params.id) && req.query.plantId) {
            User.find({ id: userId })
                .then(docs => {
                    const fav = docs[0].myFavorites;
                    const favPlantId = req.query.plantId;
                    deleteFavorite = fav.filter(item => item.id == favPlantId);
                    User.updateOne({ id: userId }, { $pull: { "myFavorites": { id: deleteFavorite[0].id } } })
                        .then(docs => { res.json(docs) })
                        .catch(err => console.log(`Error getting the data from DB: ${err}`));
                })
        }
        else {
            User.findOneAndDelete({ id: parseInt(req.params.id) })
                .then(docs => { res.json(docs) })
                .catch(err => console.log(`Error getting the data from DB: ${err}`));
        }
    }
};