function AuthDAO (connection) {

    this._connection = connection;

}

AuthDAO.prototype.insertUser = function(hash, vBody){

    return this._connection.query(  "INSERT INTO USERS (nomeUsuario, email, perfil, password) VALUES('" + vBody.nomeUsuario + 
                                    "','" + vBody.email + "','" + vBody.perfil + "','" + hash + "')");
}

AuthDAO.prototype.getUser = function(vBody){

    return this._connection.query("SELECT * FROM users WHERE nomeUsuario='"+ vBody.nomeUsuario + "'");
}

module.exports = function() {

    return AuthDAO;
}