const { Schema, model } = require('mongoose');

const favoritesSchema = new Schema({
    id: {type: Number, required: true},
    plant_name: {type: String, required: true},
    description: {type: String}
});

const userSchema = new Schema({
    id: { type: Number, required: true },
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    myFavorites: [[favorites]],

}, { collection: 'plants'});


const Plant = model('Plant', plantSchema);

module.exports = Plant;
