const requestResponseLogger = (req, res, next) => {
    const startTime = Date.now();

    const logData = {};
    if (Object.keys(req.body).length > 0) {
        logData.body = req.body;
    }

    req.logger.info(`Incoming Request: ${req.method} ${req.originalUrl}`, logData);

    res.on('finish', () => {
        const duration = Date.now() - startTime;
        req.logger.info(`Response: ${res.statusCode} - Duration: ${duration}ms`);
    });

    next();
};

module.exports = requestResponseLogger;
