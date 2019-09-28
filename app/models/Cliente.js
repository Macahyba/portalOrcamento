function Cliente () {

    this._idCliente;
    this._nomeCliente;
    this._cnpj;

}

Cliente.prototype.getIdCliente = function(){

    return this._idCliente;
}

Cliente.prototype.getNomeCliente = function(){

    return this._nomeCliente;
}

Cliente.prototype.getCnpj = function(){

    return this._cnpj;
}

Cliente.prototype.setIdCliente = function(idCliente){

    this._idCliente = idCliente;
}

Cliente.prototype.setNomeCliente = function(nomeCliente){

    this._nomeCliente = nomeCliente;
}

Cliente.prototype.setCnpj = function(cnpj){

    this._cnpj = cnpj;
}

Cliente.prototype.insereCliente = function(){


}

module.exports = function(){

    return Cliente;    
}