const { Sequelize } = require('sequelize');

const connection = new Sequelize({
    dialect: 'sqlite',
    storage: './database/database.sqlite3',
    logging: console.log()
});

module.exports = connection;
