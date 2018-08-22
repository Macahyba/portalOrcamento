module.exports = function(app){
	
	app.get('/listaOrcamentos', function(req, res){

		let orcamentosDAO = app.app.models.orcamentosDAO;

		app.config.dbConnection()
		
		.then(function(connection){

			orcamentosDAO.getOrcamentos(connection)

			.then(function(query) {

				res.render("orcamento/listaOrcamentos", {detalhe : query});	
			})

			.catch(function(queryErr){
				
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