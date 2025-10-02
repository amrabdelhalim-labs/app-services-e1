const { DataTypes } = require('sequelize');
const db = require('./database');

const Doctor = db.define('Doctors', {
    userId: {
        type: DataTypes.INTEGER
    },
    specialization: {
        type: DataTypes.STRING
    },
    address: {
        type: DataTypes.STRING
    },
    workHours: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING
    }
});

Doctor.associate = models => {
    Doctor.belongsTo(models.User, { foreignKey: 'userId' });
};

module.exports = Doctor;