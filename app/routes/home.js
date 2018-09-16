let ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

module.exports = function(app){
	app.get('/home', ensureLoggedIn('/'), function(req, res){
		
		res.render("orcamento/home"); 

	});
};