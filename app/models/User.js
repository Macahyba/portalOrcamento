function User(){

    this._idUsuario;
    this._nomeUsuario;
    this._perfil;

    return this;

}

User.prototype.insereUsuario = function(usuario){

    UserDAO.grava(usuario);

}

module.exports = function(){

    return User;    
}