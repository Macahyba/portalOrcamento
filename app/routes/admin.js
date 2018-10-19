 let ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
 
 module.exports = function(application){
   
    application.get('/admin', ensureLoggedIn('/'), function(req, res){

        if (application.locals.user.perfil !== 'usuario') {

            application.controllers.auth.adminGet(application, req, res);

        } else {

            res.status(404).render('erro404');
        }

    })

    application.post('/admin', ensureLoggedIn('/'), function(req, res){
      
        application.controllers.auth.adminPost(application, req, res);

    })
}
