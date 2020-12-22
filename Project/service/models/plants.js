const { Schema, model } = require('mongoose');

const plantSchema = new Schema({
    id: { type: Number, required: true },
    common_name: {type: String, required: true},
    slug: { type: String },
    scientific_name: {type: String},
    year: {type: Number},
    bibliography: { type: String, required: true},
    author: { type: String, required: true},
    status: { type: String, required: true},
    rank: { type: String, required: true},
    family_common_name: { type: String, required: true},
    kind_id: {type: Number},
    image_url: {type:String, required: true},
    kind: { type: String, required: true},
    family: { type: String, required: true}
}, { collection: 'plants'});


const Plant = model('Plant', plantSchema);

module.exports = Plant;
