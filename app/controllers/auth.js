module.exports.loginGet = function(app, req, res){

    res.render("orcamento/login");
}

module.exports.loginPost = function(app, req, res){
    // SOMETIMES req.session.returnTo = /favicon.ico ---> FIX
    //console.log(JSON.stringify(req.session,null,4))
    if (req.session.returnTo == '/favicon.ico') { delete req.session.returnTo; }
    app.locals.user =  { 'id' : req.user.rows[0].id, 'login': req.user.rows[0].login, 'perfil': req.user.rows[0].perfil, 'nome' : req.user.rows[0].nome };
    res.redirect(req.session.returnTo || '/home');
    delete req.session.returnTo;
}

module.exports.adminGet = function(app, req, res){

    let connection = app.config.dbConnection()

    connection.connect()

    .then(()=>{

        let AuthDAO = new app.dao.AuthDAO(connection);

        return AuthDAO.getUsers();
    })

    .then(query=>{
        
        res.render("orcamento/admin", {detalhe : query.rows, app: app});

    })

    .catch(err=>{
        
        //console.log(err);
        res.status(500).render("erro", { error : err});
    })

    .then(()=>{
        
        if (connection) { connection.end()}
    })
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

        let connection = app.config.dbConnection();

        connection.connect()

        .then(()=>{

            let AuthDAO = new app.dao.AuthDAO(connection);
            
            return AuthDAO.insertUser(hash, req.body)
        })		

        .then(()=>{

            res.redirect("/admin");
        })

        .catch(queryErr=>{
            if (queryErr.code == "ER_DUP_ENTRY") {
                res.status(500).render("erro", { error : "User already registered"});
            } else {
                res.status(500).render("erro", { error : queryErr});
            }
        })		
        
        .then(()=>{

            if (connection) { connection.end() }
        }) 

    })

}