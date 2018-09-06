module.exports = function(application){
	
	application.get('/listaOrcamentos', function(req, res){
		
		application.app.controllers.listaOrcamentos.lista(application, req, res);

	});

	application.get('/detalhe/:detalhe/:id', function(req, res){

		application.app.controllers.listaOrcamentos.detalhes(application, req, res);

	});
};

