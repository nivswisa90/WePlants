const { query } = require('express');
const User = require('../models/user');


let userID = 7;//to check how to make it dynamic!!!!!!
// let data;
exports.userDBController = {

    getUsers(req, res) {

        if (req.query.first_name) {
            User.find({ first_name: `${req.query.first_name}` })
                .then(docs => { res.json(docs) })
                .catch(err => console.log(`Error getting the data from DB: ${err}`));

        }

        else if (req.query.email) {
            User.find({ email: `${req.query.email}` })
                .then(docs => { res.json(docs) })
                .catch(err => console.log(`Error getting the data from DB: ${err}`));
        }

        else{
            User.find({})
                .then(docs => { res.json(docs) })
                .catch(err => console.log(`Error getting the data from DB: ${err}`));
    }
},

    getUser(req, res) {
    User.findOne({ id: parseInt(req.params.id) })
        .then(docs => { res.json(docs) })
        .catch(err => console.log(`Error getting the data from DB: ${err}`));

},

addUser(req, res) {

    ++UserID;
    const newUser = new User({
        "id": UserID,
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "email": req.body.email,
        // "password": nedd to check
        "specie": req.body.specie,
        "image_url": req.body.image_url,
        "family": req.body.family,
        "description": req.body.description,
        "way_of_care": req.body.way_of_care
    });
    
   
                                         
    newUser.save()
        .then(docs => { res.json(docs) })
        .catch(err => console.log(`Error getting the data from DB: ${err}`));

},

// updateUser(req, res) {
//     const toUpdate = req.body.way_of_care;
//     [a,...rest] = [toUpdate];
//     console.log(a);
//     console.log(toUpdate);
//     User.updateOne({ id: parseInt(req.params.id) },{$set: {...req.body}})
//         .then(docs => { res.json(docs) })
//         .catch(err => console.log(`Error getting the data from DB: ${err}`));
// }



deleteUser(req, res) {
    User.findOneAndDelete({ id: parseInt(req.params.id) })
        .then(docs => { res.json(docs) })
        .catch(err => console.log(`Error getting the data from DB: ${err}`));
}
};

