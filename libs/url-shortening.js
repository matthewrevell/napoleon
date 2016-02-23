exports.generate = function(validChars, length) {
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