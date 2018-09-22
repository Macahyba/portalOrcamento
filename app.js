var app = require('./app/config/server')

let port = process.env.PORT || 3000;
app.listen(port , function(){

 console.log("Server up on port " + port);

});