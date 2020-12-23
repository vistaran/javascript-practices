const MongoClient = require( 'mongodb' ).MongoClient;
const url = "mongodb://localhost:27017";

var _db;
var obj = {

    connectToServer: function( callback ) {
      MongoClient.connect( url,  { useNewUrlParser: true, useUnifiedTopology: true }, function( err, client ) {
        _db  = client.db('todo');
        return callback( err );
      } );
    },
  
    getDb: function() {
      return _db;
    }
  };

module.exports = obj;