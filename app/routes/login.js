module.exports = function(application){
	
	application.get(['/', '/login'],function(req,res){

		application.app.controllers.auth.loginGet(application, req, res);
		
	});

	application.post('/login', passport.authenticate('local-login'), function(req, res){
  
		application.app.controllers.auth.loginPost(application, req, res);

	});

	application.get('/logout', function(req, res){

		application.locals.user = null;
    	req.logout();
    	res.redirect('/');
  	});

};