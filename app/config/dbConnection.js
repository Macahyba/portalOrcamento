var { Client } = require('pg');

var connPG = function(){

	let ssl;
	
	process.env.HEROKU_BINPATH ? ssl = true: ssl = false;

	return new Client({

		connectionString : process.env.DATABASE_URL,
		ssl: ssl
	})
}

module.exports = function(){

	return connPG;

}