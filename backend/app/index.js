/**
 * In this file we will configure express with all of its middleware,
 * both in libraries and our own self made middleware
 */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const doodleRouter = require('./api/doodle');
const accountRouter = require('./api/account');

const app = express();

/**
 * This will serve static files such as images on ${BACKEND.ADDRESS}/images/.....
 */
app.use(express.static('public'))

/** 
 * Enable cors s.t. front and back can communicate
 * 'credentials: true' finishes the agreement between backend and frontend
 * on whether to expose cookies/certificates/authHeaders to the frontend js code
 */
app.use(cors({
    origin: 'http://localhost:1234',
    credentials: true
}));

// Set up some middleware that allows parse the json body of res. objects
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Routes are defined here
app.use('/account', accountRouter);
app.use('/doodle', doodleRouter);


// Error handling functions will have 4 aguments. Express will recognize
// the 4 argument length and treat the callback as an error handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        type: 'error', 
        message: err.message
    });
});

module.exports = app; 