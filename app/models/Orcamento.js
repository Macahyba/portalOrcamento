function Orcamento(usuario, cliente, equipamento){

    this._idOrcamento;
    this._valor;
    this._status;
    this._dataCriacao;
    this._usuario = usuario;
    this._cliente = cliente;
    this._equipamento = equipamento;

}

Orcamento.prototype.getIdOrcamento = function(){

    return this._idOrcamento;
}

Orcamento.prototype.getValor = function(){

    return this._valor;
}

Orcamento.prototype.getStatus = function(){

    return this._status;
}

Orcamento.prototype.getDataCriacao = function(){

    return this._dataCriacao;
}

Orcamento.prototype.setIdOrcamento = function(idOrcamento){

    this._idOrcamento = idOrcamento;
}

Orcamento.prototype.setValor = function(valor){

    this._valor = valor;
}

Orcamento.prototype.setStatus = function(status){

    this._status = status;
}

Orcamento.prototype.setDataCriacao = function(dataCriacao){

    this._dataCriacao = dataCriacao;
}

Orcamento.prototype.aprovaOrcamento = function(){


}

Orcamento.prototype.procuraOrcamento = function(){


}

module.exports = function(){

    return Orcamento;    
}