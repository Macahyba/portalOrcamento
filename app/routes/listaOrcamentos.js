module.exports = function(application){
	
	application.get('/listaOrcamentos', function(req, res){
		
		application.app.controllers.orcamentos.listaOrcamentos(application, req, res);

	});

	application.get(['/clienteDetalhe/:cliId','/orcDetalhe/:orcId','/userDetalhe/:userId'], function(req, res){

		application.app.controllers.orcamentos.detalhes(application, req, res);

	});
};

