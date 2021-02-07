const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const favoritesSchema = new Schema({
    id: {type: Number},
    plantName: {type: String, required: true},
    description: {type: String},
    imageUrl: {type: String},
    date: {type: String}
});

const userSchema = new Schema({
    id: { type: Number },
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    myFavorites: [favoritesSchema],
}, { collection: 'users'});

const User = model('User', userSchema);

module.exports = User;
