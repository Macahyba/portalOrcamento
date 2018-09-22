var app = require('./config/server')

let port = 5000;
app.listen(port , function(){

 console.log("Server up on port " + port);

});