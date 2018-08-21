module.exports = function(app){
	
	app.get('/geral1', function(req, res){

		var orcamentosModel = app.app.models.orcamentosModel;

		app.config.dbConnection()
		
		.then(function(connection){

			orcamentosModel.pGetOrcamentos(connection)

			.then(function(query) {

			//	orcamentosModel.getOrcamentos(query)
				res.render("orcamento/geral", {detalhe : query});	
			})

			.catch(function(queryErr){
				
			//	console.log(queryErr);
				res.status(500).render("erro", { error : queryErr});
			});		
			
			connection.end();	
				
		})

		.catch(function(connectionErr){
			
			console.log(connectionErr);
			res.status(500).render("erro", { error : connectionErr});
		});

	});
};