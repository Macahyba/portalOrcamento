module.exports = function(app){
	
	app.get('/aprovar', function(req, res){

		var pConnection = app.config.dbConnection();
		
		pConnection.then(function(connection){

			var pQuery = connection.query("select * from users");

			pQuery.then(function(query) {
				res.render("orcamento/aprovar", {users : query});	
			});

			pQuery.catch(function(query){
				
				console.log("erro de query");
				res.status(404).render("erro");
			});		
			
			connection.end();	
				
		});

		pConnection.catch(function(error){
			
			console.log("erro de conexao");
			res.status(404).render("erro");
		});

	});
};