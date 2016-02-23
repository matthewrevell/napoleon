// Manage connection and basic operations with Couchbase

var config = require('../config/config.js');

// Connect to Couchbase

var couchbase = require('couchbase');

var couchbaseCluster = new couchbase.Cluster(config.database.location);
var urlsBucket = couchbaseCluster.openBucket(config.database.urlsBucket, process.env.URLSPWORD);

exports.get = function(key, bucket, callback) {
    var db;
    if (bucket === 'urls') {
      db = urlsBucket;
    } else {
      db = generalBucket;
    }
    
    db.get(key, function(err, res) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, res);
      }
    });
}

exports.upsert = function(key, value, bucket, callback) {
  var db;
  if (bucket === 'urls') {
    db = urlsBucket;
  } else {
    db = generalBucket;
  }
  
  db.upsert(key, value, function(err, res) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, true);
    }
  });
}