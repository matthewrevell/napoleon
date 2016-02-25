var async = require('async');

var urls = require('../models/url.js');

function generateRandomishString(validChars, length) {  
  var path = '';
  for (var i=0; i < length; i++) {
    path += validChars.charAt(Math.floor(Math.random() * validChars.length));
    console.log('path: ' + path);
  }
  return path;
}


exports.generate = function(validChars, length, callback) {
  // Generate a string of randomly selected characters.
  // Paramaters provide the valid characters that can be used in the string
  // and the length of the string to return.  
  console.log('================');
  console.log('In generate');
  console.log('================');
    
  var path = '';
  var unique = false;
  
  async.whilst(
    function () { return unique === false; },
    function (cb) {
      console.log('-----------');
      console.log('in the whilst looooop');
      console.log('-----------');
      // Generate the randomish string
      path = generateRandomishString(validChars, length);
      
      // Check if the string is unique
      urls.isPathUnique(path, function(err, res) {
        if (res === true) {
          unique = true;    
          cb();
        } else {
          unique = false;
          cb();
        }
      })
    },
    function (err) {
      if (err) {
        console.log(err);
      }
    }
  );
  
  callback(null, path);
  
}