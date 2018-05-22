var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.post('/', (req, res) => {
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

module.exports = router;
