// url.js: functions related to retrieving, validating and storing
// shortened URLs. 


var database = require('./database.js');

// Private functions

function isShortedUnique(urlPortion, callback) {
  var keyPrefix = 'url';
  var keySeparator = '::';
  var urlKey = keyPrefix + keySeparator + urlPortion;
  console.log(urlKey);
  
  database.get(urlKey, 'urls', function(err, res) {
    if (err) {
      console.log(err);
      console.log(err.code);
      if (err.code === 13) {
        console.log('Unique! in callback');
        callback (null, true);
      } else {
        console.log('Not unique! in callback');
        callback (null, false);
      }      
    } else {
      callback (err, null);
    }
  });
}

// Exported functions

exports.save = function (urlDestination, identifier, callback) {
  var keyPrefix = 'url';
  var keySeparator = '::'; // XXX: move this and keyPrefix to config.js
  var urlKey = keyPrefix + keySeparator + identifier;
  var doc = 
    { url: urlDestination,
      createdAt: new Date()      
    }
    
  // Uniqueness of the shortened URL is a model-level constraint, so we'll
  // enforce it here in the model.
  
  isShortedUnique(identifier, function(err, res) {
    if (err) {
      callback(err, null);
    } else {
      database.upsert(urlKey, doc, 'urls', function(err, res) {
        if (err) {
          console.log(err);
          callback (err, null);
        }
        console.log(urlKey + ' saved', res);
        callback(null, res);
      });  
    }
  });
}