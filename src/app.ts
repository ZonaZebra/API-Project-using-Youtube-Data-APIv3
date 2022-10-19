import * as http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import logging from './logger/logging';
import routes from './routes/routes';
import db_routes from './routes/db-routes';
import db from 'db';


const NAMESPACE = 'Server';
const router = express();

router.use((req, res, next) => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`);
    });

    next();
});

// Parsing the request

router.use(bodyParser.urlencoded({ extended: true })); // Allows us to take in Nested JSON
router.use(bodyParser.json()); //Allows us to avoid using JSON stringify or have to parse the JSON separately

// Rules of the API, these are very loose b/c this is just a local project for fun

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
        return res.status(200).json({});
    }

    next();
});

// Routes

router.use('/', routes);
router.use('/db', db_routes);


// Error Handling

router.use((req, res) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

// Server

const httpServer = http.createServer(router);
httpServer.listen(process.env.SERVER_PORT, () => {
    logging.info(NAMESPACE, `Server running on ${process.env.SERVER_HOSTNAME}:${process.env.SERVER_PORT}`);
    db.runMigrations();
});
