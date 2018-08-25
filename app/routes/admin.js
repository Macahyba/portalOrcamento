module.exports = function(app){

	app.get('/inserirOrc',function(req,res){
		
		let orcamentosDAO = app.app.models.orcamentosDAO;
		let conn;

		app.config.dbConnection()

		.then(function(connection){

			conn = connection;
			return orcamentosDAO.getSumm(connection)
		})

		.then(function(query){
			//console.log(query.nomeEquip[0].nomeEquip)
			res.render("orcamento/inserirOrc", {detalhe : query});
		})

			/*.catch(function(queryErr){
				
				res.status(500).render("erro", { error : queryErr});
			})*/		

			
		

		.catch(function(queryErr){
				
			res.status(500).render("erro", { error : queryErr});
		})
		
		.finally(function(){
			if (conn) { conn.end()}
		})
		
	});

	app.post('/inserirOrc',function(req,res){
		//console.log(req.body)
		let orcamentosDAO = app.app.models.orcamentosDAO;
		let conn;

		//console.log(req.body);
		app.config.dbConnection()

		.then(function(connection){

			conn = connection;

			// Fields validation on server side
			Object.keys(req.body).forEach(function(key) {
				if(!req.body[key]){ throw key + " is missing"; }
			})
			return orcamentosDAO.insereOrcamento(connection, req.body)
		})

		.then(function(query){
			
			//res.send(query);
			res.redirect("/listaOrcamentos");
		})

		/*.catch(function(queryErr){
			
			res.status(500).render("erro", { error : queryErr});
		})		*/
		
		.finally(function(){

			if (conn) { conn.end() }
		})
		

	});
}