module.exports = function(app){
	
	app.get('/listaOrcamentos', function(req, res){
		
		let orcamentosDAO = app.app.models.orcamentosDAO;
		let conn;

		app.config.dbConnection()
		
		.then(function(connection){
			
			conn = connection;
			return orcamentosDAO.getOrcamentos(connection)
		})

		.then(function(query) {

			res.render("orcamento/listaOrcamentos", {detalhe : query});	
		})

		.catch(function(err){
			
			//console.log(err);
			res.status(500).render("erro", { error : err});
		})

		.finally(function(){
			
			if (conn) { conn.end()} ;
		})

	});
};