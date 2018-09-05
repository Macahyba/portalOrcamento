module.exports = function(application){

	application.get('/inserirOrc',function(req,res){
		
		application.app.controllers.admin.inserirOrcGET(application, req, res);
		
	});

	application.post('/inserirOrc',function(req,res){

		application.app.controllers.admin.inserirOrcPOST(application, req, res);

	});
}