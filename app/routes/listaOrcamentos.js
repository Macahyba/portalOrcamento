module.exports = function(app){
	
	app.get('/listaOrcamentos', function(req, res){

		let orcamentosModel = app.app.models.orcamentosModel;

		app.config.dbConnection()
		
		.then(function(connection){

			orcamentosModel.getOrcamentos(connection)

			.then(function(query) {

			//	orcamentosModel.getOrcamentos(query)
				res.render("orcamento/listaOrcamentos", {detalhe : query});	
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