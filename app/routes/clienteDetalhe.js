module.exports = function(app){
	
	app.get('/clienteDetalhe/:cliId', function(req, res){
		
		let orcamentosDAO = app.app.models.orcamentosDAO;

		app.config.dbConnection()
		
		.then(function(connection){

			orcamentosDAO.getCliente(connection,req.params.cliId)

			.then(function(query) {

				res.render("orcamento/clienteDetalhe", {detalhe : query});	
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