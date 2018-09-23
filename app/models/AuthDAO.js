function AuthDAO (connection) {

    this._connection = connection;

}

AuthDAO.prototype.insertUser = function(hash, vBody){
    //console.log(JSON.stringify(vBody,null,4))
    return this._connection.query(  "INSERT INTO USERS (nomeusuario, email, perfil, password) VALUES('" + vBody.nomeUsuario +
                                    "','" + vBody.email + "','" + vBody.perfil + "','" + hash + "')")
}

AuthDAO.prototype.getUserByName = function(nomeUsuario){
    
    return this._connection.query("SELECT * FROM users WHERE nomeusuario='" + nomeUsuario + "'");
}

AuthDAO.prototype.getUserById = function(id){
    
    return this._connection.query("SELECT * FROM users WHERE id='" + id + "'");
}

module.exports = function() {

    return AuthDAO;
}