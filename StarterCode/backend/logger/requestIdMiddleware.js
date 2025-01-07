const { v4: uuidv4 } = require('uuid');
const logger = require("./logger");

const requestIdMiddleware = (req, res, next) => {
    const requestId = req.headers['x-request-id'] || uuidv4();
    req.requestId = requestId;

    res.setHeader('x-request-id', requestId);
    req.logger = require('./logger').child({ requestId });

    next();
};

module.exports = requestIdMiddleware;
