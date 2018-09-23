var app = require('./app/config/server')

let port = process.env.PORT || 3000;
app.listen(port , function(){
console.log(JSON.stringify(process.env,null,4))
 console.log("Server up on port " + port);

});