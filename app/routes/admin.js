module.exports = function(application){

    application.get('/admin', function(req, res){

        application.app.controllers.auth.adminGet(application, req, res);

    })

    application.post('/admin', function(req, res){

        application.app.controllers.auth.adminPost(application, req, res);

    })
}
