let ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

module.exports = function(application){
	
	application.get('/listaOrcamentos', ensureLoggedIn('/'), function(req, res){
		
		application.app.controllers.listaOrcamentos.lista(application, req, res);

	});

	application.get('/detalhe/:detalhe/:id', ensureLoggedIn('/'), function(req, res){

		application.app.controllers.listaOrcamentos.detalhes(application, req, res);

	});

	application.post('/download/', ensureLoggedIn('/'), function(req, res){

		application.app.controllers.listaOrcamentos.download(application, req, res);
	})
};

