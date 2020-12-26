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

addPlant(req, res) {
    ++plantID;
    const newPlant = new Plant({
        "id": plantID,
        "name": req.body.name,
        "specie": req.body.specie,
        "image_url": req.body.image_url,
        "family": req.body.family,
        "description": req.body.description,
        "way_of_care": req.body.way_of_care
    });
    

    newPlant.save()
        .then(docs => { res.json(docs) })
        .catch(err => console.log(`Error getting the data from DB: ${err}`));

},

updatePlant(req, res) {
    Plant.updateOne({ id: parseInt(req.params.id) }, req.body)
        .then(docs => { res.json(docs) })
        .catch(err => console.log(`Error getting the data from DB: ${err}`));
}

// deleteUser(req, res) {
//     User.findOneAndDelete({ id: parseInt(req.params.id) })
//         .then(docs => { res.json(docs) })
//         .catch(err => console.log(`Error getting the data from DB: ${err}`));
// },
};

