const jwt = require('jsonwebtoken');
const User = require('../models/user');

const requireAuth = (req, res, next) => {
    const token = req.cookies.token;

    if(token) {
        jwt.verify(token, 'jwtSecret', (err, decoded) => {
            if(err) {
                console.log(err);
                res.json({ auth: false, message: 'authentication problem' });
            }
            else {
                console.log(decoded);
                next();
            }
        })
    }
}

const checkUser = (req, res, next) => {
    const token = req.cookies.token;

    if(token) {
        jwt.verify(token, 'jwtSecret', async (err, decoded) => {
            if(err) {
                console.log(err);
                res.json({ auth: false, message: 'authentication problem' });
                res.locals.users = null;
                next();
            }
            else {
                let user = await User.findById(decoded.id);
                res.locals.user = user;
                next();
            }
        })
    }
    else {
        res.locals.user = null;
        next();
    }
}

module.exports= { requireAuth, checkUser };