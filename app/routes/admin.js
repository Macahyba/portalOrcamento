 let ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
 
 module.exports = function(application){
   
    application.get('/admin', ensureLoggedIn('/'), function(req, res){

        application.controllers.auth.adminGet(application, req, res);

    })

    application.post('/admin', ensureLoggedIn('/'), function(req, res){

        application.controllers.auth.adminPost(application, req, res);

    })
}
