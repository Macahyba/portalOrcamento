var { Client } = require('pg');

var connPG = function(){

	return new Client({
		user: 'postgres',
		host: '127.0.0.1',
		database: 'orcamentosdb',
		password: '123456',
		port: 5432,
	})

}

module.exports = function(){

	return connPG;

}