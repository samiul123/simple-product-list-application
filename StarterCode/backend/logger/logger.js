const { createLogger, format, transports } = require('winston');
require('dotenv').config();
const DailyRotateFile = require('winston-daily-rotate-file');

const { combine, timestamp, printf } = format;

const logFormat = printf(({ level, message, timestamp, requestId, ...meta }) => {
    const requestIdStr = requestId ? `[RequestID: ${requestId}]` : '';
    return `${timestamp} ${requestIdStr} [${level.toUpperCase()}]: ${message} ${Object.keys(meta).length ? JSON.stringify(meta) : ''}`;
});

const logger = createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        logFormat
    ),
    transports: [
        new transports.Console({ level: process.env.LOG_LEVEL || 'info' }),
        new DailyRotateFile({
            filename: process.env.LOG_FILE_NAME || 'logs/app-%DATE%.log',
            datePattern: process.env.LOG_ROTATION_DATE_PATTERN || 'YYYY-MM-DD',
            zippedArchive: process.env.LOG_ZIP_ARCHIVED !== 'false',
            maxSize: process.env.LOG_FILE_MAX_SIZE || '10m',
            maxFiles: process.env.LOG_MAX_KEEP || '10d'
        }),
    ]
});

module.exports = logger;
