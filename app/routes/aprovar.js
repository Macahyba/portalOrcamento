module.exports = function(app){
	
	app.get('/aprovar', function(req, res){

		var pConnection = app.config.dbConnection();
		
		pConnection.then(function(connection){

			var pQuery = connection.db("orcamentos").collection('users').find().toArray();
		
			pQuery.then(function(query) {
				res.render("orcamento/aprovar", {users : query});	
			});

			connection.close();		
	
		});
	});
};