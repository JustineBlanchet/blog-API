const bunyan = require('bunyan');

const streams = [{
    level: 'error',
    path: './log/error.log',
    type: 'rotating-file',
    period: '1d', // daily rotation
    count: 3, // keep 3 back copies
}];

if (process.env.NODE_ENV !== 'production') {
    // Si ce n'est pas le cas on affiche les messages en console.
    streams.push({
        level: 'info',
        stream: process.stdout,
    });
}

module.exports = bunyan.createLogger({
    name: 'cadex',
    streams,
});
