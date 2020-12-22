const { query } = require('express');
const Plant = require('../models/plants');


 let plantID = 20;
// let data;
exports.plantDBController = {

    getPlants(req, res) {

        if (req.query.family) {
            Plant.find({ family: `${req.query.family}` })
                .then(docs => { res.json(docs) })
                .catch(err => console.log(`Error getting the data from DB: ${err}`));

        }

        else if (req.query.rank) {
            Plant.find({ rank: `${req.query.rank}` })
                .then(docs => { res.json(docs) })
                .catch(err => console.log(`Error getting the data from DB: ${err}`));
        }

        else{
            Plant.find({})
                .then(docs => { res.json(docs) })
                .catch(err => console.log(`Error getting the data from DB: ${err}`));
    }
},

    getPlant(req, res) {
    Plant.findOne({ id: parseInt(req.params.id) })
        .then(docs => { res.json(docs) })
        .catch(err => console.log(`Error getting the data from DB: ${err}`));

},

// addUser(req, res) {
//     ++plantID;
//     const newPlant = new Plant({
//         "id": plantID,
//         "common_name": req.body.common_name,
//         "slug": req.body.slug,
//         "scientific_name": req.body.scientific_name,
//         "year": req.body.year,
//         "bibliography": req.body.bibliography,
//         "color": req.body.color,
//         "job": req.body.job
//     });

//     newUser.save()
//         .then(docs => { res.json(docs) })
//         .catch(err => console.log(`Error getting the data from DB: ${err}`));

// },

// updatUser(req, res) {

//     User.updateOne({ id: parseInt(req.params.id) }, req.body)
//         .then(docs => { res.json(docs) })
//         .catch(err => console.log(`Error getting the data from DB: ${err}`));
// },

// deleteUser(req, res) {
//     User.findOneAndDelete({ id: parseInt(req.params.id) })
//         .then(docs => { res.json(docs) })
//         .catch(err => console.log(`Error getting the data from DB: ${err}`));
// },
};

