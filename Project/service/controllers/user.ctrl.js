const { query } = require('express');
const User = require('../models/user');
const Plant = require('../models/plants');
const e = require('express');


let userID = 7;

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
    updateUser(req, res) {
        User.find({id: parseInt(req.params.id)})
        .then(docs => {
            const Favorites = docs[0].myFavorites;
            const favLen = Favorites.length;
            const plantName = req.query.name;
            for(var i = 0; i<favLen; i++) {
                if(plantName == Favorites[i].plant_name) {
                    res.send('This plant is already added in your favorites');
                    break;
                }
            }
            if(i == favLen){
                Plant.findOne({name: plantName})
                .then((docs) => {
                    if(docs != null){
                        const id = 10;
                        const plant_name = docs.name;
                        const description = docs.description;
                        const image_url = docs.image_url;
                        User.updateOne({ id: parseInt(req.params.id)} , {$push: {"myFavorites": {id: id, plant_name: plant_name, description: description, image_url: image_url}}})
                        .then(docs => { res.json(docs) })
                        .catch(err => console.log(`Error getting the data from DB: ${err}`));
                    }
                    else{
                        res.send('Plant not found');
                    }
                    // const id = 10;
                    // const plant_name = docs.name;
                    // const description = docs.description;
                    // const image_url = docs.image_url;
                    
                    // User.updateOne({ id: parseInt(req.params.id)} , {$push: {"myFavorites": {id: id, plant_name: plant_name, description: description, image_url: image_url}}})
                    //     .then(docs => { res.json(docs) })
                    //     .catch(err => console.log(`Error getting the data from DB: ${err}`));
                })
                .catch((err) => console.log(`Error getting the data from DB: ${err}`));
            }
        })
        .catch(err => console.log(`Error: ${err}`));
        
        // const name = req.query.name;
        // Plant.findOne({name: name})
        //     .then((docs) => {
        //         const id = 10;
        //         const plant_name = docs.name;
        //         const description = docs.description;
        //         const image_url = docs.image_url;
        //         User.updateOne({ id: parseInt(req.params.id)} , {$push: {"myFavorites": {id: id, plant_name: plant_name, description: description, image_url: image_url}}})
        //             .then(docs => { res.json(docs) })
        //             .catch(err => console.log(`Error getting the data from DB: ${err}`));
        //     })
        //     .catch((err) => console.log(`Error getting the data from DB: ${err}`));

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

