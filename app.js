var couchbase = require('couchbase');

var couchbaseCluster = new couchbase.Cluster('couchbase://localhost');
var couchbaseBucket = couchbaseCluster.openBucket('urls', 'donkey');

var validCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-';

var text = generateURLPortion(validCharacters, 6);
console.log(text);

checkURLPortionUniqueness(text, function(err, result) {
  if (err) {
    console.log(err);
  } else {
    if (result === true) {
      console.log('Unique!')
    } else {
      console.log('Not unique!');
    }
  }
});

saveURL ('http://devrel.net', generateURLPortion(validCharacters, 6), function(err, res) {
  if (err) {
    console.log(err);
  }
  console.log(res);
});


function generateURLPortion(validChars, length) {
  // Generate a string of randomly selected characters.
  // Paramaters provide the valid characters that can be used in the string
  // and the length of the string to return.  
    
  var urlPortion = '';
    
  for (var i=0; i < length; i++) {
    urlPortion += validChars.charAt(Math.floor(Math.random() * validChars.length));
    console.log(urlPortion);
  }
  
  return urlPortion;
  
}

function checkURLPortionUniqueness(urlPortion, callback) {
  var keyPrefix = 'url';
  var keySeparator = '::';
  var urlKey = keyPrefix + keySeparator + urlPortion;
  console.log(urlKey);
  
  couchbaseBucket.get(urlKey, function(err, res) {
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

function saveURL(urlDestination, identifier, callback) {
  var keyPrefix = 'url';
  var keySeparator = '::';
  var urlKey = keyPrefix + keySeparator + identifier;
  var doc = 
    { url: urlDestination,
      createdAt: new Date()      
    }
  
  couchbaseBucket.upsert(urlKey, doc, function(err, res) {
    if (err) {
      console.log(err);
      callback (err, null);
    }
    console.log(urlKey + ' saved', res);
    callback(null, true);
  });
  
}