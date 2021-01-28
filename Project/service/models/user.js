const { Schema, model } = require('mongoose');

const favoritesSchema = new Schema({
    id: {type: Number},
    plant_name: {type: String, required: true},
    description: {type: String},
    image_url: {type: String},
    date: {type: String}
});

const userSchema = new Schema({
    id: { type: Number },
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true},
    my_favorites: [favoritesSchema],
}, { collection: 'users'});

const User = model('User', userSchema);

module.exports = User;
