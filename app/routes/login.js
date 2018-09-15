module.exports = function(application){
	application.get('/',function(req,res){
		
		application.app.controllers.auth.loginGet(application, req, res);
		
	});

	application.post('/login', function(req, res){

		application.app.controllers.auth.loginPost(application, req, res);
	})
};