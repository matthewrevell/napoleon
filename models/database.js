// Manage connection and basic operations with Couchbase

var config = require('../config/config.js');

// Connect to Couchbase

var couchbase = require('couchbase');

var couchbaseCluster = new couchbase.Cluster(config.database.location);
module.exports.urlsDB = couchbaseCluster.openBucket(config.database.urlsBucket, process.env.URLSPWORD);

//function set(key, value, callback) {
  
//}