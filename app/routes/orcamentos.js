module.exports = function(application){

	application.get('/inserirOrc',function(req,res){
		
		application.app.controllers.inserirOrc.inserirOrcGET(application, req, res);
		
	});

	application.post('/inserirOrc',function(req,res){

		application.app.controllers.inserirOrc.inserirOrcPOST(application, req, res);

	});

	application.get('/formFill/:table/:field', function(req, res){

        application.app.controllers.formFill.formFill(application, req, res);

    })
}