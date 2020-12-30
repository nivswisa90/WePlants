const { query } = require('express');
const User = require('../models/user');
const Plant = require('../models/plants');


let userID = 7;//to check how to make it dynamic!!!!!!
// let data;
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

    addUser(req, res) {
        ++userID;
        const newUser = new User({
            "id": userID,
            "first_name": req.body.first_name,
            "last_name": req.body.last_name,
            "email": req.body.email,
            // "myFavorites": req.body.myFavorites
        });


        newUser.save()
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error getting the data from DB: ${err}`));

    },
    addMyFavorites(req, res) {
        const name = req.query.name;
        Plant.findOne({name: name})
            .then((docs) => {

                const id = 10;
                const plant_name = docs.name;
                const description = docs.description;
                User.updateOne({ id: parseInt(req.params.id)} , {$push: {"myFavorites": {id: id, plant_name: plant_name, description: description}}})
                    .then(docs => { res.json(docs) })
                    .catch(err => console.log(`Error getting the data from DB: ${err}`));
            })
            .catch((err) => console.log(`Error getting the data from DB: ${err}`));

        // User.updateOne({ id: parseInt(req.params.id) },{$set: {...req.body}})
        //     .then(docs => { res.json(docs) })
        //     .catch(err => console.log(`Error getting the data from DB: ${err}`));
    },
    deleteUser(req, res) {
        User.findOneAndDelete({ id: parseInt(req.params.id) })
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error getting the data from DB: ${err}`));
    }
};

