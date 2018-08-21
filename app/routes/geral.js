// refatorar para promises!
module.exports = function(app){
	
	app.get('/geral', function(req, res){

		var orcamentosModel = app.app.models.orcamentosModel;

		app.config.dbConnection()
		
		.then(function(connection){

			orcamentosModel.getOrcamentos(connection, function(error, result){

				if (error){
					
					console.log(error);
					res.status(500).render("erro", { error : error});
				}
				res.render("orcamento/geral", {detalhe : result});	
			})
			//connection.query("aaa")
			//orcamentosModel.getOrcamentos(connection,pQuery);

			/*connection.query(
				"SELECT orcamentos.id, nomeCliente, nomeEquip, serialNumber, valor, nomeUsuario, dataCriacao " +
				"FROM orcamentos " +
				"LEFT JOIN users ON orcamentos.idUsuario=users.id " + 
				"LEFT JOIN equipamentos ON orcamentos.idEquip=equipamentos.id "+
				"LEFT JOIN clientes ON orcamentos.idCliente=clientes.id ORDER BY id")*/

			//.then(function(query) {

			//	orcamentosModel.getOrcamentos(query)
			//	res.render("orcamento/geral", {detalhe : query});	
			//})

			//.catch(function(queryErr){
				
			//	console.log(queryErr);
			//	res.status(500).render("erro", { error : queryErr});
			//});		
			
			connection.end();	
				
		})

		.catch(function(connectionErr){
			
			//console.log(connectionErr);
			res.status(500).render("erro", { error : connectionErr});
		});

	});
};