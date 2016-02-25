var config = {
  site: {
    siteURL: 'localhost:3000'
  },
  general: {
    validCharacters: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-'
  },
  database: {
    location: 'couchbase://localhost',
    keySeparator: '::',
    urlsBucket: 'urls',
    generalBucket: 'sytta',
    urlKeyPrefix: 'url'
  }  
} 

module.exports = config;