function AuthDAO (connection) {

    this._connection = connection;

}

function capitalize(string) {

    return string.charAt(0).toUpperCase() + string.slice(1);
}

AuthDAO.prototype.insertUser = function(hash, vBody){
    //console.log(JSON.stringify(vBody,null,4))
    return this._connection.query(  "INSERT INTO USERS (login, nome, email, perfil, password) VALUES($1, $2, $3, $4, $5)", 
                                    [capitalize(vBody.login), vBody.nome, vBody.email, vBody.perfil, hash])
}

AuthDAO.prototype.getUserByName = function(login){
    
    return this._connection.query("SELECT * FROM users WHERE login=$1", [capitalize(login.trim())]);
}

AuthDAO.prototype.getUserById = function(id){
    
    return this._connection.query("SELECT * FROM users WHERE id=$1", [id]);
}

AuthDAO.prototype.getUsers = function(){

    return this._connection.query("SELECT id, login, nome, email, perfil FROM users")
}


AuthDAO.prototype.getManagerList = function(){

    return this._connection.query("SELECT nome, email FROM users WHERE perfil='manager' OR perfil='admin'");
}


AuthDAO.prototype.updateUser = function(id, field, value) {

    return this._connection.query("UPDATE users set $2=$3 WHERE id=$1", [id, field, value])
}

AuthDAO.prototype.deleteUser = function(id) {

    return this._connection.query("DELETE FROM users WHERE id=$1", [id])
}

module.exports = function() {

    return AuthDAO;
}