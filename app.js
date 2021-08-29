const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const contactRouter = require('./src/routes/contact');
const {OK} = require("http-status-codes");

let app = express();

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: OK
};

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(corsOptions));

app.use('/contact', contactRouter);

module.exports = app;
