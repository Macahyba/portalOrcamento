let LocalStrategy = require('passport-local').Strategy;

module.exports.myPass = function(){

    return passport = require('passport');
}

module.exports.passaportInit = function(app){

    let passport = this.myPass();
    passport.serializeUser(function(user, done) {
        
        done(null, user);
    
    });
      
    passport.deserializeUser(function(user, done) {
        
        done(null, user);

    });

    passport.use('local-login', new LocalStrategy({
        
        usernameField : 'login',
        passwordField : 'password',
        passReqToCallback : true 
    },
    function(req, login, password, done) { 
        
        if(!login || !password){ 
            throw "Data is missing"; 
        }
    
        let bcrypt = require('bcrypt');
        let userData;
        
        let connection = app.config.dbConnection();

        connection.connect()

        .then(()=>{
            //console.log(JSON.stringify(connection, null, 4))
            let AuthDAO = new app.models.AuthDAO(connection);
            //conn = connection;

            return AuthDAO.getUserByName(login)
        })		
    
        .then(query =>{
            //console.log(JSON.stringify(query,null,4))
            if (query.rowCount) {

                userData = query;
                return Promise.all([bcrypt.compare(password, query.rows[0].password), query])
            } 
        })
    
        .then(auth =>{
            //console.log(auth)
            if (auth) {

                if (auth[0]) { return done(null , userData); }

                if (!auth[0]) { return done(null, false); }

            } else {

                return done(null, false);
            }

        })
    
        .catch(queryErr =>{
            // REFACTOR
            //console.log(queryErr)
            //res.status(500).render("erro", { error : queryErr});
            return done(queryErr);

        })		
        
        .then(()=>{
    
            if (connection) { connection.end() }
        })
        

    }));

    app.use(passport.initialize());
    app.use(passport.session());
}