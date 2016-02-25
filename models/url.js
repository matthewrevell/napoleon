// url.js: functions related to retrieving, validating and storing
// shortened URLs. 

var config = require ('../config/config.js');
var database = require('./database.js');

function generateURLKey(path) {
  return config.database.urlKeyPrefix + config.database.keySeparator + path;
}

function save(urlDestination, path, callback) {
  console.log('================');
  console.log('In url.save');  
  console.log('================');
  
  var urlKey = generateURLKey(path);
  console.log('urlKey: ' + urlKey);
  
  var doc = 
    { url: urlDestination,
      createdAt: new Date()      
    }
    
  // Uniqueness of the shortened URL is a model-level constraint, so we'll
  // enforce it here in the model.
  
  isPathUnique(path, function(err, res) {
    if (err) {
      callback(err, null);
    } else {
      if (res === true) {
        database.upsert(urlKey, doc, 'urls', function(err, res) {
          if (err) {
            console.log(err);
            callback (err, null);
          }
          console.log(urlKey + ' saved', res);
          callback(null, res);
        });  
      } else {
        console.log('Key exists');
        callback(null, 'Key exists');
      }     
    }
  });
}

function isPathUnique(path, callback) {
  console.log('================');
  console.log('in isPathUnique');
  console.log('================');
  var urlKey = generateURLKey(path);
  console.log('checking if ' + urlKey + ' is unique');
  
  // XXX: replace with database.checkUnique to decouple from Couchbase 
  //specifics.
  database.get(urlKey, 'urls', function(err, res) {
    if (err) {
      console.log('err: ' + err.code);
      if (err.code === 13) {
        console.log(urlKey + ' is unique!');
        callback (null, true);
      } else {
        console.log('Not unique!');
        callback (null, false);
      }      
    } else {
      callback (err, null);
    }
  });
}

exports.save = save;
exports.isPathUnique = isPathUnique;