const express = require('express');
const app = express();
const morgan = require('morgan');

const shoeRoutes = require('./api/routes/shoes');

app.use(morgan('dev')); //logging

app.use('/shoes', shoeRoutes);

module.exports = app;
