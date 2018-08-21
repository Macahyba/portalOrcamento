module.exports = function(app){
	
	app.get('/aprovar', function(req, res){

		var pConnection = app.config.dbConnection();
		
		pConnection.then(function(connection){

			var pQuery = connection.query("select * from users");

			pQuery.then(function(query) {

				res.render("orcamento/aprovar", {users : query});	
			});

			pQuery.catch(function(queryErr){
				
				//console.log(queryErr);
				res.status(500).render("erro", { error : queryErr});
			});		
			
			connection.end();	
				
		});

		pConnection.catch(function(connectionErr){
			
			//console.log(connectionErr);
			res.status(500).render("erro", { error : connectionErr});
		});

	});
};