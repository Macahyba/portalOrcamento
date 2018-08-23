module.exports = function(app){
	
	app.get('/listaOrcamentos', function(req, res){
		
		let date = require('date-and-time');
		let idOrc = 22;
		// idOrc = YYYYMM+idCli(3dig)+incremental(3dig)
		// 201808001001
		console.log(date.format(new Date(), 'YYYYMMDD')+''+
		idOrc.toLocaleString('en', {minimumIntegerDigits:3,useGrouping:false}));
		
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