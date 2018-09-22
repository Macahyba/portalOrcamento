let express = require('express');
let path = require('path')
let consign = require('consign');
let bodyParser = require('body-parser');
//let errorRoute = require('../app/middlewares/error.js');
let passaportConfig = require('../middlewares/passport.js')
let expressSession = require('express-session')({ secret: 'superultrasecretsalt', resave: false, saveUninitialized: false, cookie: { maxAge: 3600000 } });
// to achando q o consign não serve pra carregar middlewares 
let app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(bodyParser.urlencoded({extended: true}));
app.use("/scripts", express.static(path.join(__dirname, "../scripts")));
app.use("/css", express.static(path.join(__dirname, "../css")));
app.use("/pdf", express.static(path.join(__dirname, "../pdf")));
app.use(expressSession);


passaportConfig.passaportInit(app);

consign({cwd: 'app'})
    .include("routes")
    .then("config/dbConnection.js")
    .then("models")
    .then("controllers")
    .then("middlewares")
    .into(app);


//errorRoute(app);

module.exports = app;