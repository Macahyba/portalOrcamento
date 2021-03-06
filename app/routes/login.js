module.exports = function(application){
	
	application.get(['/', '/login'],function(req,res){

		application.controllers.auth.loginGet(application, req, res);
		
	});

	application.post('/login', passport.authenticate('local-login'), function(req, res){
  
		application.controllers.auth.loginPost(application, req, res);

	});

	application.get('/logout', function(req, res){

		application.locals.user = null;
		delete req.session.returnTo ;
    	req.logout();
    	res.redirect('/');
  	});

};