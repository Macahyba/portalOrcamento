var mysql = require('promise-mysql');

var connMySQL = function(){

	return mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '123456',
		database: 'orcamentosDB'
	})
}

module.exports = function(){

	return connMySQL;

}