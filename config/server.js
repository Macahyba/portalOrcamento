let express = require('express');
let path = require('path')
let consign = require('consign');
let bodyParser = require('body-parser');
//let errorRoute = require('../app/middlewares/error.js');
let passaportConfig = require('../app/middlewares/passport.js')
let expressSession = require('express-session')({ secret: 'superultrasecretsalt', resave: false, saveUninitialized: false, cookie: { maxAge: 3600000 } });
// to achando q o consign não serve pra carregar middlewares 
let app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../app/views'));
app.use(bodyParser.urlencoded({extended: true}));
app.use("/scripts", express.static(path.join(__dirname, "../app/scripts")));
app.use("/css", express.static(path.join(__dirname, "../app/css")));
app.use("/pdf", express.static(path.join(__dirname, "app/pdf")));
app.use(expressSession);

passaportConfig.passaportInit(app);

consign()
    .include("app/routes")
    .then("config/dbConnection.js")
    .then("app/models")
    .then("app/controllers")
    .then("app/middlewares")
    .into(app);


//errorRoute(app);

module.exports = app;