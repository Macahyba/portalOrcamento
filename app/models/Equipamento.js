function Equipamento () {

    this._idEquip;
    this._nomeEquip;
    this._serialNumber;
}

Equipamento.prototype.getIdEquip = function(){

    return this._idEquip;
}

Equipamento.prototype.getNomeEquip = function(){

    return this._nomeEquip;
}

Equipamento.prototype.getSerialNumber = function(){

    return this._serialNumber;
}

Equipamento.prototype.setIdEquip = function(idEquip){

    this._idEquip = idEquip;
}

Equipamento.prototype.setNomeEquip = function(nomeEquip){

    this._nomeEquip = nomeEquip;
}

Equipamento.prototype.setSerialNumber = function(serialNumber){

    this._serialNumber = serialNumber;
}

Equipamento.prototype.insereEquip = function(){


}


module.exports = function(){

    return Equipamento;    
}