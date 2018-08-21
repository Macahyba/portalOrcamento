module.exports = function(app){
	
	app.get('/orcDetalhe/:orcId', function(req, res){

		
		let orcamentosModel = app.app.models.orcamentosModel;

		app.config.dbConnection()
		
		.then(function(connection){

			orcamentosModel.getOrcamentoDetalhado(connection,req.params.orcId)

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