module.exports = function(app){
	
	app.get(['/clienteDetalhe/:cliId','/orcDetalhe/:orcId','/userDetalhe/:userId'], function(req, res){

		let conn;
		let path = req.url.split("/")[1];
		let id = req.url.split("/")[2];
		let orcamentosDAO = app.app.models.orcamentosDAO;

		app.config.dbConnection()
		
		.then(function(connection){

			conn = connection;
			
			switch (path){
				case "clienteDetalhe":
					return orcamentosDAO.getClienteList(connection,id)
					break;
				case "orcDetalhe":
					return orcamentosDAO.getOrcamentoDetalhado(connection,id)
					break;
				case "userDetalhe":
					return orcamentosDAO.getUserList(connection,id)
					break;
				default :
					throw "Routing error!"
			}

		})

		.then(function(query) {

			res.render("orcamento/" + path, {detalhe : query});	
		})

		.catch(function(err){
			
			res.status(500).render("erro", { error : err});
		})		
		
		.finally(function(){
			
			if (conn) { conn.end()} ;
		})

	});
};