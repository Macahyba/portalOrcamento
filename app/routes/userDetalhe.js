module.exports = function(app){
	
	app.get('/userDetalhe/:userId', function(req, res){
		
		let orcamentosDAO = app.app.models.orcamentosDAO;

		app.config.dbConnection()
		
		.then(function(connection){

			orcamentosDAO.getUser(connection,req.params.userId)

			.then(function(query) {

				res.render("orcamento/userDetalhe", {detalhe : query});	
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