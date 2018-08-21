module.exports = function(app){

	app.get('/inserirOrc',function(req,res){
		
		res.render("orcamento/inserirOrc");
		
	});

	app.post('/inserirOrc',function(req,res){

		let orcamentosModel = app.app.models.orcamentosModel;
		console.log(req.body.cliente);
		var vBody = req.body;
		app.config.dbConnection()

		.then(function(connection){

			orcamentosModel.insereOrcamento(connection, vBody)

			.then(function(query){

				res.send("sucess")
			})
		})
		
	});
}