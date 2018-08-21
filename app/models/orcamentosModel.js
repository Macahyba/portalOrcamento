// refatorar para promises!
module.exports = function(){

    this.getOrcamentos = function(connection, callback){
        connection.query(
            "SELECT orcamentos.id, nomeCliente, nomeEquip, serialNumber, valor, nomeUsuario, dataCriacao " +
            "FROM orcamentos " +
            "LEFT JOIN users ON orcamentos.idUsuario=users.id " + 
            "LEFT JOIN equipamentos ON orcamentos.idEquip=equipamentos.id "+
            "LEFT JOIN clientes ON orcamentos.idCliente=clientes.id ORDER BY id", callback);

        //.then(function(query){
           // return this;
        //})
    }
    
    return this;
    
}