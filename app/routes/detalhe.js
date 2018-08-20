module.exports = function(app){
	app.get('/detalhe', function(req, res){
		
		res.render("orcamento/detalhe"); 

	});
};