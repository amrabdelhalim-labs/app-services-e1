const { Sequelize } = require('sequelize');

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
  }
);

db.authenticate().then(() => {
  console.log('Database connected...');
}).catch(() => {
  console.error('Unable to connect to the database');
});

module.exports = db;
