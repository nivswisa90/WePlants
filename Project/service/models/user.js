const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

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
    password: {type: String, required: true},
    email: {type: String, required: true},
    my_favorites: [favoritesSchema],
}, { collection: 'users'});

// userSchema.statics.login = async function(email, password) {
//     const user = await this.findOne({ email });

//     if(user) {
//         const auth = bcrypt.compareSync(password, user.password);
//         if(auth) {
//             return user;
//         }
//         else {
//             throw Error('Wrong password');
//         }
//     }
//     throw Error('User does not exist');
// }

const User = model('User', userSchema);

module.exports = User;
