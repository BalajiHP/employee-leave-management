const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var User = require('../models/user');
var passport = require('passport');
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

router.post('/login', (req, res, next) => {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return res.status(501).json(err); }
        else if (!user) { return res.status(501).json(info); }
        else {
            req.logIn(user, function(err) {
              if (err) { return res.status(501).json(err); }
              return res.status(200).json({message:'Login Success'});
            });
        }
      })(req, res, next);
});

router.get('/employee',isValidUser,function(req,res,next){
    return res.status(200).json(req.user);
});


router.get('/logout',isValidUser,function(req,res,next){
    req.logout();
    return res.status(200).json({message:'Logout Success'});
});


function isValidUser(req,res,next){
    if (req.isAuthenticated()) next();
    else return res.status(401).json({message:'Unauthorized Request'}); 
}

module.exports = router;