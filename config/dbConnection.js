var mongo = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017';

var mongoConn = function(){

	return mongo.connect(url, { useNewUrlParser : true});
}

module.exports = function(){

	return mongoConn;

}