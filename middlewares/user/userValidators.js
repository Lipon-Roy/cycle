const { check, validationResult } = require('express-validator');
const createError = require('http-errors');
const User = require('../../models/People');

const addUserValidators = [
    check('username')
        .trim()
        .isLength({ min: 1 })
        .withMessage('Username is required')
        .isAlpha('en-US', { ignore: ' -' })
        .withMessage('Username must not contain anything other than alphabet'),
    check('email')
        .trim()
        .isEmail()
        .withMessage('Invalid email')
        .custom(async value => {
            try {
                const user = await User.findOne({ email: value });
                if (user) {
                    throw createError('Email already exists');
                }
            } catch (err) {
                throw createError(err.message);
            }
        }),
    check('password')
        .isStrongPassword()
        .withMessage("Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol"),
];

const addUserValidationHandler = (req, res, next) => {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();

    if (Object.keys(mappedErrors).length == 0) next();
    else {
        res.status(400).json({
            errors: mappedErrors
        })
    }
}

module.exports = {
    addUserValidators,
    addUserValidationHandler
}