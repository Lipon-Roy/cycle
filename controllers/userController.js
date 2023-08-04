const createError = require('http-errors');
const bcrypt = require('bcrypt')
const User = require('../models/People');

// get all user
const getUser = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({ users });
    } catch (err) {
        next(createError(err.message));
    }
}

// signup user
const signup = async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            ...req.body,
            password: hashedPassword
        });
        await user.save();
        res.status(201).json({
            message: "User was successfully created"
        });
    } catch (err) {
        res.status(500).json({
            errors: {
                common: {
                    msg: 'Unknown error occured'
                }
            }
        })
    }
}

module.exports = {
    getUser,
    signup,
}