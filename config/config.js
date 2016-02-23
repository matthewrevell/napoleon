var config = {
  site: {
    siteURL: 'localhost:3000'
  },
  general: {
    validCharacters: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-'
  },
  database: {
    location: 'couchbase://localhost',
    urlsBucket: 'urls',
    generalBucket: 'sytta'
  }  
} 

module.exports = config;