const createError = require('http-errors');

// 404 not found handler
const notFoundHandler = (req, res, next) => {
    next(createError(404, 'your requested content was not found'));
}

// common error handler
const errorHandler = (err, req, res, next) => {
    let errors = process.env.NODE_ENV == 'development' ? err : { message: err.message };

    res.status(err.status || 500);

    res.json({ errors });
}

module.exports = { notFoundHandler, errorHandler }