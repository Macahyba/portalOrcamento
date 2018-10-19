let ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

module.exports = function(application){

	application.get('/inserirOrc', ensureLoggedIn('/'), function(req,res){
		
		application.controllers.inserirOrc.inserirOrcGET(application, req, res);
		
	});

	application.post('/inserirOrc', ensureLoggedIn('/'), function(req,res){

		application.controllers.inserirOrc.inserirOrcPOST(application, req, res);

	});

	application.get('/formFill/:table/:field', ensureLoggedIn('/'), function(req, res){

        application.controllers.formFill.formFill(application, req, res);

    })
}