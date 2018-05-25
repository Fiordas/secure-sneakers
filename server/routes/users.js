const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');

router.post('/signup', (req, res) => {
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const userData = new User({
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

router.post('/signin', (req, res) => {
    User.authenticate(req.body.email, req.body.password, function (error, user) {
        if (error || !user) {
            res.json({ success: false, message: 'Wrong email or password.' });
        } else {
            //req.session.userId = user._id;

            const token = jwt.sign({
                id: user._id
            }, 'secsneakers', { expiresIn: '1h' });

            res.json({
                success: true,
                message: 'User sign in successful!',
                token: token
            });
        }
    });
})

module.exports = router;
