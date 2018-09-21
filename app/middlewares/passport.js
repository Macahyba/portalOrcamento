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
        
        usernameField : 'nomeUsuario',
        passwordField : 'password',
        passReqToCallback : true 
    },
    function(req, nomeUsuario, password, done) { 

        if(!nomeUsuario || !password){ 
            throw "Data is missing"; 
        }
    
        let bcrypt = require('bcrypt');
        let userData;
        
        app.config.dbConnection()
    
        .then(function(connection){
    
            let AuthDAO = new app.app.models.AuthDAO(connection);
            conn = connection;
    
            return AuthDAO.getUserByName(nomeUsuario)
        })		
    
        .then(function(query){
    
            if (query.length) {

                userData = query;
                return Promise.all([bcrypt.compare(password, query[0].password), query])
            } 
        })
    
        .then(function(auth){
            
            if (auth) {

                if (auth[0]) { return done(null , userData); }

                if (!auth[0]) { return done(null, false); }

            } else {

                return done(null, false);
            }

        })
    
        .catch(function(queryErr){
            // REFACTOR
            //console.log(queryErr)
            //res.status(500).render("erro", { error : queryErr});
            return done(queryErr);

        })		
        
        .finally(function(){
    
            if (conn) { conn.end() }
        }) 
        

    }));

    app.use(passport.initialize());
    app.use(passport.session());
}