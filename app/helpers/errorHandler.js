const logger = require('./logger');

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
    logger.error(err);

    let statusCode;
    let message;

    if (err.name === 'ApiError') {
        statusCode = err.infos?.statusCode ?? 400;
        message = err.message;
    } else if (err.name === 'CategoryError') {
        statusCode = 500;
        message = err.message;
    } else if (err.name === 'PostError') {
        statusCode = 500;
        message = err.message;
    } else if (err.name === 'ValidationError') {
        statusCode = 400;
        message = err.details[0].message;
    } else if (err.code === '23505') {
        statusCode = 400;
        message = `${err.constraint.replace('_description_key', '')} already exists`;
    } else {
        statusCode = 500;
        message = 'Internal server error';
    }
    res.status(statusCode).json({ error: message });
};
