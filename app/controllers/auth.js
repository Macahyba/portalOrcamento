module.exports.loginGet = function(app, req, res){

    res.render("orcamento/login");
}

module.exports.loginPost = function(app, req, res){

    Object.keys(req.body).forEach(function(key) {
        if(!req.body[key]){ throw key + " is missing"; }
    })

    let bcrypt = require('bcrypt');
    let pass = req.body.password;
            
    app.config.dbConnection()

    .then(function(connection){

        let AuthDAO = new app.app.models.AuthDAO(connection);
        conn = connection;

        return AuthDAO.getUser(req.body)
    })		

    .then(function(query){

        if (query.length) {
            return bcrypt.compare(pass, query[0].password)
        } 
    })

    .then(function(auth){

        if (auth) {

            res.redirect("/home");
        
        } else {

            res.render("erro", { error : "Access Denied" });
        }
    })

    .catch(function(queryErr){
    
        res.status(500).render("erro", { error : queryErr});
    })		
    
    .finally(function(){

        if (conn) { conn.end() }
    }) 

}

module.exports.adminGet = function(app, req, res){

    res.render("orcamento/admin");
}

module.exports.adminPost = function(app, req, res){

    Object.keys(req.body).forEach(function(key) {
        if(!req.body[key]){ throw key + " is missing"; }
    })

    //res.send(JSON.stringify(req.body,null,4))
    let bcrypt = require('bcrypt');
    let pass = req.body.password;

    bcrypt.hash(pass, 11)

    .then(function(hash){

        app.config.dbConnection()

        .then(function(connection){

            let AuthDAO = new app.app.models.AuthDAO(connection);
            conn = connection;

            return AuthDAO.insertUser(hash, req.body)
        })		

        .then(function(){

            res.send("sucesso");
        })

        .catch(function(queryErr){
            if (queryErr.code == "ER_DUP_ENTRY") {
                res.status(500).render("erro", { error : "User already registered"});
            } else {
                res.status(500).render("erro", { error : queryErr});
            }
        })		
        
        .finally(function(){

            if (conn) { conn.end() }
        }) 

    })

}