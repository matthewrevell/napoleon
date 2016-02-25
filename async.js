var async = require('async');

var count = 0;

async.whilst(
    function () { return count < 5; },
    function (callback) {
        count++;
        setTimeout(function () {
          console.log(count);
            callback(null, count);
            
        }, 10);
    },
    function (err, n) {
        // 5 seconds have passed, n = 5
    }
);