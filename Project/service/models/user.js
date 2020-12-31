const { Schema, model } = require('mongoose');

const favoritesSchema = new Schema({
    id: {type: Number},
    plant_name: {type: String, required: true},
    description: {type: String},
    image_url: {type: String}
});

const userSchema = new Schema({
    id: { type: Number, required: true },
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true},
    myFavorites: [favoritesSchema],

}, { collection: 'users'});


const User = model('User', userSchema);

module.exports = User;
