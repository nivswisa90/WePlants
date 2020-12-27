const { query } = require('express');
const Plant = require('../models/plants');


let plantID = 7;//to check how to make it dynamic!!!!!!
// let data;
exports.plantDBController = {

    getPlants(req, res) {

        if (req.query.family) {
            Plant.find({ family: `${req.query.family}` })
                .then(docs => { res.json(docs) })
                .catch(err => console.log(`Error getting the data from DB: ${err}`));

        }

        else if (req.query.name) {
            Plant.find({ name: `${req.query.name}` })
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
    const toUpdate = req.body.way_of_care;
    let set = {$set:{}};
    if(toUpdate.water !== null ) {
        set.$set["way_of_care.water"] = toUpdate.water;
    }
    if(toUpdate.feed !== null) {
        set.$set["way_of_care.feed"] = toUpdate.feed;
    }
    if(toUpdate.light !== null) {
        set.$set["way_of_care.light"] = toUpdate.light;
    }
    if(toUpdate.temperature !== null) {
        set.$set["way_of_care.temperature"] = toUpdate.temperature;
    }
    console.log(set);
    Plant.updateOne({ id: parseInt(req.params.id) }, set)
        .then(docs => { res.json(docs) })
        .catch(err => console.log(`Error getting the data from DB: ${err}`));
},



deletePlant(req, res) {
    Plant.findOneAndDelete({ id: parseInt(req.params.id) })
        .then(docs => { res.json(docs) })
        .catch(err => console.log(`Error getting the data from DB: ${err}`));
}
};

