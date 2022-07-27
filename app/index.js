const express = require('express');
const apidocs = require('./helpers/apidocs');
const router = require('./routers');

const logger = require('./helpers/logger');
const ApiError = require('./errors/apiError');
const errorHandler = require('./helpers/errorHandler');

const app = express();

process.on('uncaughtException', () => {
    logger.info('erreur non catché');
});

process.on('unhandledRejection', () => {
    logger.info('erreur non catché');
});

app.use(express.json());

apidocs(app);

app.use(router);

app.use((req, res, next) => {
    next(new ApiError('endpoint not found', { statusCode: 404 }));
});

app.use(errorHandler);

module.exports = app;
