var database = require('./database.js');

exports.checkURLPortionUniqueness = function(urlPortion, callback) {
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

exports.save = function (urlDestination, identifier, callback) {
  var keyPrefix = 'url';
  var keySeparator = '::';
  var urlKey = keyPrefix + keySeparator + identifier;
  var doc = 
    { url: urlDestination,
      createdAt: new Date()      
    }
  
  database.upsert(urlKey, doc, 'urls', function(err, res) {
    if (err) {
      console.log(err);
      callback (err, null);
    }
    console.log(urlKey + ' saved', res);
    callback(null, true);
  });
  
}