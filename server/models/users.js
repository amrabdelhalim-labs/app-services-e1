const { DataTypes } = require('sequelize');
const db = require('./database');

const User = db.define('Users', {
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING
    },
    isDoctor: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    latitude: {
        type: DataTypes.FLOAT
    },
    longitude: {
        type: DataTypes.FLOAT
    }
});

User.associate = models => {
    User.hasOne(models.Doctor, { foreignKey: 'userId' });
};

module.exports = User;
