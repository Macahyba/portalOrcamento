module.exports = function(app){
	
	app.get('/detalhe', function(req, res){

		app.config.dbConnection()
		
		.then(function(connection){

			connection.query(
				"SELECT orcamentos.id, nomeCliente, nomeEquip, serialNumber, valor, nomeUsuario, dataCriacao " +
				"FROM orcamentos " +
				"LEFT JOIN users ON orcamentos.idUsuario=users.id " + 
				"LEFT JOIN equipamentos ON orcamentos.idEquip=equipamentos.id "+
				"LEFT JOIN clientes ON orcamentos.idCliente=clientes.id WHERE orcamentos.id=1 ORDER BY id")

			.then(function(query) {

				res.render("orcamento/detalhe", {detalhe : query});	
			})

			.catch(function(queryErr){
				
				//console.log(queryErr);
				res.status(500).render("erro", { error : queryErr});
			})		
			
			connection.end();	
				
		})

		.catch(function(connectionErr){
			
			//console.log(connectionErr);
			res.status(500).render("erro", { error : connectionErr});
		});

	});
};