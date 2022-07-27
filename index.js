require('dotenv').config();
const { createServer } = require('http');

const logger = require('./app/helpers/logger');

const app = require('./app');

const port = process.env.PORT;

const server = createServer(app);

server.listen(port, () => {
    logger.info(`http://localhost:${port}`);
});
