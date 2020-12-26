const { Schema, model } = require('mongoose');

const wayOfCareSchema = new Schema({
    light: {type: String},
    water: {type: String},
    feed: {type: String},
    temperature: {type: String}
});

const plantSchema = new Schema({
    id: { type: Number, required: true },
    name: {type: String, required: true},
    specie: { type: String },
    image_url: {type:String, required: true},
    family: { type: String, required: true},
    description: {type: String},
    way_of_care: [wayOfCareSchema]
}, { collection: 'plants'});


const Plant = model('Plant', plantSchema);

module.exports = Plant;
