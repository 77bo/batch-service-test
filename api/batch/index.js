var express = require('express');
var router = express.Router();
var batch = require('./batch.controller');

router.post('/batch', batch);

module.exports = router;
