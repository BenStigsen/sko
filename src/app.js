const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const shoeRoutes = require('./api/routes/shoes');
    
app.use(morgan('dev')); //logging
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Allow CORS
app.use((res, req, next) => {
    res.header('Access-Control-Allow-Origin', '*'); //* is all requests meaning /* . Can specify urls instead.
    res.header('Access-Conrol-Allow-Headers', '*');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELTE');
        return res.status(200).json({});
    }
    next();
});

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

require('./models/shoes')

module.exports = app;
