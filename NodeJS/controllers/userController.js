const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { User } = require('../models/user');

// => localhost:3000/user/
router.post('/register', (req, res, next) => {
    var user = new User({
        username: req.body.username,
        email: req.body.email,
        password: User.hashPassword(req.body.password),
        creation_dt: Date.now()
    });
    user.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in User Data Save :' + JSON.stringify(err, undefined, 2)); }
    }); 
});

module.exports = router;