const express = require('express');
const app = express();
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize'); //links the constructor to the import.

const sequelize = new Sequelize({
    dialect: 'sqlite',
    Storage: './database.sqlite3'
});

async function initDB() {
    try {
        await sequelize.authenticate();
        console.log('Connection successful!');
    } catch (error) {
        console.error('Connection failed.', error);
    }
}

initDB();

const mainRoutes = require('./routes/main');
const apiRoutes = require('./routes/api');

// Templating engine
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

//Allow CORS
app.use((res, req, next) => {
    res.header('Access-Control-Allow-Origin', '*'); //* is all requests meaning /* . Can specify urls instead.
    res.header('Access-Conrol-Allow-Headers', '*');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
});

app.use(morgan('dev')); //logging

app.use(mainRoutes);
app.use('/api', apiRoutes);

//request error handling (400s)
app.use((req, res, next) => {
    const error = new Error('Not found.');
    error.status = 404;
    next(error);
});

//program error handling (500s)
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({message: error.message});
});

module.exports = app;
