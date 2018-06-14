const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');
const { check, validationResult } = require('express-validator/check');

router.post('/signup', [
    check('email')
        .isEmail()
        .normalizeEmail(),
    check('firstName')
        .not().isEmpty()
        .trim()
        .escape(),
    check('lastName')
        .not().isEmpty()
        .trim()
        .escape(),
    check('password')
        .isLength({ min: 6 })
        .escape()
    ], (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;
    const userData = new User({
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password
    });

    userData.save(function (error) {
        if (error) {
            res.json({ success: false, message: 'User with this email already exists' });
        } else {
            const token = jwt.sign({
                id: userData._id,
                admin: userData.admin
            }, 'chickenhorsepizzadubstep');

            res.send({
                success: true,
                message: 'User data saved successfully!',
                token: token,
                expiresIn: 3600,
                userId: userData._id
            });
        }
    });
});

router.post('/signin', [
    check('email')
        .isEmail()
        .normalizeEmail(),
    check('password')
        .isLength({ min: 6 })
        .escape()
    ], (req, res) => {

    User.authenticate(req.body.email, req.body.password, function (error, user) {
        if (error || !user) {
            res.json({ success: false, message: 'Wrong email or password' });
        } else {
            const token = jwt.sign({
                id: user._id,
                admin: user.admin
            }, 'chickenhorsepizzadubstep');

            res.json({
                success: true,
                message: 'User sign in successful!',
                token: token,
                expiresIn: 3600,
                userId: user._id
            });
        }
    });
});

router.get('/:token', (req, res) => {
    var token = req.params.token;
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, 'chickenhorsepizzadubstep', function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                res.json({
                    success: true,
                    message: 'Token authentication successful!',
                    decoded: decoded,
                });
            }
        });
    } else {
        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});

module.exports = router;
