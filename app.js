var config = require('./config/config.js');

var database = require('./models/database.js');

var urlsDB = database.urlsDB;

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
  
  urlsDB.get(urlKey, function(err, res) {
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

