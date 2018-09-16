var app = require('./config/server')

let port = 3000;
app.listen(port , function(){

 console.log("Server up on port " + port);

});