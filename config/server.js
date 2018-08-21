let express = require('express');
let consign = require('consign');
let bodyParser = require('body-parser');
let errorRoute = require('../app/middleware/error.js');
// to achando q o consign não serve pra carregar middlewares 
let app = express();

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(bodyParser.urlencoded({extended: true}));

consign()
    .include("app/routes")
    .then("config/dbConnection.js")
    .then("app/models")
    .into(app);

errorRoute(app);

module.exports = app;