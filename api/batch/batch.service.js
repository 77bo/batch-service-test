var request = require('request');
var _ = require('lodash');
var async = require('async');

// config to support parsing of PATH parameters in request object
_.templateSettings.interpolate = /{([\s\S]+?)}/g;

/**
 * Execute batch requests on Users Service
 *
 * @param data - data to send, contains url and method
 * @param next - called when processing is finished
 */
module.exports.exec = function(data, next) {
  console.debug('input data', data);

  var stats = {
    total: data.payload.length,
    success: 0,
    failed: 0
  };
  var results = []; // resulting array, will contain task execution info

  // Split payload in group of 5 items.
  // Trying to satisfy service limitation of 5requests/10s
  var taskGroups = chunkArray(data.payload, 5);
  console.debug('taskGroups', taskGroups);

  // create a queue object with concurrency 5
  // passed callback is actual handler that making request to UsersService
  var q = async.queue(function(task, callback) {
    console.debug('task', task);
    const urlTemplate = _.template(data.endpoint.url);
    const url = urlTemplate({'userId': task.userId});

    let attempt = 0;
    async.retry(2, executeRequest, function(err, result) {
      console.debug('final result', result);
      if (result.success) {
        stats.success++;
      } else {
        stats.failed++;
      }
      callback(result);
    });

    function executeRequest(cb) {
      console.debug('requesting', url);
      request({
        url: url,
        method: data.endpoint.method,
        json: true,
        body: task
      }, function (error, response, body) {
        console.debug('error:', error);
        console.debug('statusCode:', response && response.statusCode);
        // update stats
        const success = response && response.statusCode == 200;
        const result = {
          task: task,
          success: success,
          status: response.statusCode,
          attempt: ++attempt
        };
        if (!success) {
          return cb(true, result);
        }
        cb(null, result);
      });
    }

  }, 5);

  var pushingToQueue = true;
  taskGroups.forEach((group, index) => {
    let delay = 10*1000;
    if (index === 0) {
      delay = 0;
    }
    // now lets push to queue portion of task each ~10 seconds
    setTimeout(() => {
      // adding items to the queue (batch-wise)
      q.push(group, function(result) {
        console.debug('finished processing item', result);
        results.push(result);
      });
      if (index === taskGroups.length - 1) {
        pushingToQueue = false;
      }
    }, delay);
  });

  // assign a final callback
  q.drain = function() {
    console.debug('all items have been processed');
    if (!pushingToQueue) {
      next(stats, results);
    }
  };

};

/**
 * Returns an array with arrays of the given size.
 *
 * @param arr {Array} Array to split
 * @param chunkSize {Integer} Size of every group
 */
function chunkArray(arr, chunkSize){
  var results = [];

  while (arr.length) {
    results.push(arr.splice(0, chunkSize));
  }

  return results;
}