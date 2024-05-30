const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const mainRoutes = require('./routes/main');

// Templating engine
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.use(mainRoutes);

module.exports = app;
