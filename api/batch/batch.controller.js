const batchService = require('./batch.service');

module.exports = function(req, res) {
  batchService.exec(req.body, (stats, results) => {
    res.send({
      ...stats,
      results: results
    });
  });
};