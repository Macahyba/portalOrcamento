var app = require('./config/server')

let port = 3000;

//var rotaLogin = require('./app/routes/login')(app);
//var rotaOrcamento = require('./app/routes/orcamento')(app);
//var rotaAprovar = require('./app/routes/aprovar')(app);
//var rotaError = require('./app/routes/error')(app);

app.listen(port , function(){

 console.log("Server up on port " + port);

});