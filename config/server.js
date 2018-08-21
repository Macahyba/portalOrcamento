let express = require('express');
let consign = require('consign');
let errorRoute = require('../app/middleware/error.js');
// to achando q o consign não serve pra carregar middlewares 
let app = express();

app.set('view engine', 'ejs');
app.set('views', './app/views');

consign()
    .include("app/routes")
    .then("config/dbConnection.js")
    .then("app/models")
    .into(app);

errorRoute(app);

module.exports = app;