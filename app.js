"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
require('dotenv').config();
const app = express_1.default();
const port = Number(process.env.NODE_PORT) || 3001;
const hostname = '127.0.0.1';
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const cors = require('cors');
const corsOpts = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
};
app.use(cors(corsOpts));
const getLoggerForStatusCode = (statusCode) => {
    if (statusCode >= 500) {
        return console.error.bind(console);
    }
    if (statusCode >= 400) {
        return console.warn.bind(console);
    }
    return console.log.bind(console);
};
const logRequestStart = (req, res, next) => {
    console.info(`${req.method} ${req.originalUrl}`);
    const cleanup = () => {
        res.removeListener('finish', logFn);
        res.removeListener('close', abortFn);
        res.removeListener('error', errorFn);
    };
    const logFn = () => {
        cleanup();
        const logger = getLoggerForStatusCode(res.statusCode);
        logger(`${res.statusCode} ${res.statusMessage}; ${res.get('Content-Length') || 0}b sent`);
    };
    const abortFn = () => {
        cleanup();
        console.warn('Request aborted by the client');
    };
    const errorFn = (err) => {
        cleanup();
        console.error(`Request pipeline error: ${err}`);
    };
    res.on('finish', logFn);
    res.on('close', abortFn);
    res.on('error', errorFn);
    next();
};
app.use(logRequestStart);
const apiRoutes = require('./routes');
app.use('/api', apiRoutes);
const expressSwagger = require('express-swagger-generator')(app);
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            description: 'Erb apis',
            title: 'Swagger',
            version: '1.0.0',
        },
        host: `${'localhost'}:${port}`,
        basePath: '/api',
        produces: ['application/json', 'application/xml'],
        schemes: ['http', 'https'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: '',
            },
        },
    },
    basedir: __dirname,
    files: ['./routes/*.ts'],
};
const spec = expressSwagger(swaggerOptions);
fs_1.default.writeFile('./swagger-spec.json', JSON.stringify(spec), () => {
    console.log('generate swagger-spec.json');
});
app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
//# sourceMappingURL=app.js.map