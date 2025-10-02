const { sequelize } = require('sequelize');
const db = require('./database');
const User = require('./users');
const Doctor = require('./doctors');

const models = {
    User,
    Doctor
};

Object.values(models).forEach(model => {
    if (model.associate) {
        model.associate(models);
    };
});

module.exports = models;