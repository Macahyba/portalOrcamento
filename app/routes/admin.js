module.exports = function(app){

	app.get('/inserirOrc',function(req,res){
		
		let orcamentosDAO = app.app.models.orcamentosDAO;

		app.config.dbConnection()

		.then(function(connection){

			orcamentosDAO.getOrcamentos(connection)

			.then(function(query){
				//console.log(query[0].nomeCliente)
				res.render("orcamento/inserirOrc", {detalhe : query});
			})
		})
		
	});

	app.post('/inserirOrc',function(req,res){

		let orcamentosDAO = app.app.models.orcamentosDAO;

		//console.log(req.body);
		app.config.dbConnection()

		.then(function(connection){

			orcamentosDAO.insereOrcamento(connection, req.body)

			.then(function(query){

				res.send("sucess")
			})

			.catch(function(queryErr){
				
				res.status(500).render("erro", { error : queryErr});
			});		
			
			connection.end();	
		})

	});
}