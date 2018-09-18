let ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

module.exports = function(application) {

	application.post('/approve', ensureLoggedIn('/'), function(req, res){

		application.app.controllers.aprovarOrc.aprova(application, req, res);

	});

}