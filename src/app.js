const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const shoeRoutes = require('./api/routes/shoes');

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.use(morgan('dev')); //logging

app.use('/shoes', shoeRoutes);

//request error handling (400s)
app.use((req, res, next) => {
    const error = new Error('Not found.');
    error.status = 404;
    next(error);
});

//program error handling (500s)
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
