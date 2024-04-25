const express = require('express');
const app = express();
const shoeRoutes = require('./api/routes/shoes');

app.use('/shoes', shoeRoutes);

module.exports = app;
