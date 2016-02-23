// Stytta: a NodeJS link shortener
// Matthew Revell -- matthew@understated.co.uk
// Stytta appears to be Icelandic for shorten

var config = require('./config/config.js');
var urls = require('./models/url.js');
var shorten = require('./libs/url-shortening.js');

var text = shorten.generate(config.general.validCharacters, 6);
console.log(text);

urls.save('http://www.understated.co.uk/', text, function(err, res) {
  if (err) {
    console.log(err);
  } else {
    console.log(res);
  }
});

/*urls.checkURLPortionUniqueness(text, function(err, result) {
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
});*/