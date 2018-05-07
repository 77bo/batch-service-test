const batchService = require('./batch.service');

module.exports = function(req, res) {
  batchService.exec(req.body, (results) => {
    res.send({ resulst: results });
  });
};