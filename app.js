var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');

var batchRouter = require('./api/batch');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', batchRouter);

module.exports = app;
