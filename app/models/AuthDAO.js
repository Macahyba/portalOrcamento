function AuthDAO (connection) {

    this._connection = connection;

}

AuthDAO.prototype.insertUser = function(hash, vBody){

    return this._connection.query(  "INSERT INTO USERS (nomeUsuario, email, perfil, password) VALUES(?, ?, ?, ?)", 
                                    [ vBody.nomeUsuario, vBody.email, vBody.perfil, hash ]);
}

AuthDAO.prototype.getUser = function(id, nomeUsuario){
    console.log(id, nomeUsuario)
    return this._connection.query(  "SELECT * FROM users WHERE id=? OR nomeUsuario=?", 
                                    [ id, nomeUsuario ]);
}

module.exports = function() {

    return AuthDAO;
}