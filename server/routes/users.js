var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.post('/signup', (req, res) => {
    var email = req.body.email;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var password = req.body.password;
    var confirmPassword = req.body.confirmPassword;
    var userData = new User({
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password,
        confirmPassword: confirmPassword
    })

    userData.save(function (error) {
        if (error) {
            console.log(error)
        }
        res.send({
            success: true,
            message: 'User data saved successfully!'
        })
    })
})

router.post('/signin', (req, res, next) => {
    User.authenticate(req.body.email, req.body.password, function (error, user) {
        if (error || !user) {
            var err = new Error('Wrong email or password.');
            err.status = 401;
            return next(err);
        } else {
            //req.session.userId = user._id;
            res.send({
                success: true,
                message: 'User sign in successful!'
            })
        }
    });
})

module.exports = router;
