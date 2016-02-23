// Sytta: a NodeJS link shortener
// Matthew Revell -- matthew@understated.co.uk

var config = require('./config/config.js');

//var database = require('./models/database.js');

var urls = require('./models/url.js');

//var urlsDB = database.urlsDB;

var validCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-';

var text = generateURLPortion(validCharacters, 6);
console.log(text);

urls.checkURLPortionUniqueness(text, function(err, result) {
  if (err) {
    console.log(err);
  } else {
    if (result === true) {
      console.log('Unique!')
      urls.save('http://www.couchbase.com', text, function(error, res) {
        if (err) {
          console.log(err);
        } else {
          console.log('Saved', res);
        }
        
      });
      return;
    } else {
      console.log('Not unique!');
      return;
    }
    
  }
});

/*saveURL ('http://devrel.net', generateURLPortion(validCharacters, 6), function(err, res) {
  if (err) {
    console.log(err);
  }
  console.log(res);
});*/


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