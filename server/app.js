const express = require('express');
require('dotenv').config();
const routes = require('./routes');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./models/database');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: err.message });
});

db.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch((err) => {
    console.error('Unable to connect to the database:', err);
});