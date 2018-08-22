module.exports = function(app){
	
	app.get('/orcDetalhe/:orcId', function(req, res){
		
		let orcamentosDAO = app.app.models.orcamentosDAO;

		app.config.dbConnection()
		
		.then(function(connection){

			orcamentosDAO.getOrcamentoDetalhado(connection,req.params.orcId)

			.then(function(query) {

				res.render("orcamento/orcDetalhe", {detalhe : query});	
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