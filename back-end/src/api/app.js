const express = require('express');
const cors = require('cors');
const path = require('path');
const errorMiddleware = require('./middlewares/errorMiddleware');
const router = require('./routes');

const app = express();

app.use(express.json());
app.use(cors());

app.use(cors());

app.use('/', router);

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(errorMiddleware);

app.use(express.static(path.join(__dirname, '../../public')));

module.exports = app;
