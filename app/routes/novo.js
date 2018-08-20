module.exports = function(app){
	app.get('/novo', function(req, res){
		
		res.render("orcamento/novo"); 

	});
};