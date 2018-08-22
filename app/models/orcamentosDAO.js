module.exports = function(){

    let sQuery =
        "SELECT orcamentos.id, idUsuario, nomeUsuario, idCliente, nomeCliente, idEquip, nomeEquip, serialNumber, valor, " +
        "status, dataCriacao " +
        "FROM orcamentos " +
        "LEFT JOIN users ON orcamentos.idUsuario=users.id " + 
        "LEFT JOIN equipamentos ON orcamentos.idEquip=equipamentos.id "+
        "LEFT JOIN clientes ON orcamentos.idCliente=clientes.id ";
    
    this.getOrcamentos = function(connection){
 
        return connection.query(sQuery + "ORDER BY id");
    }

    this.getOrcamentoDetalhado = function(connection, id) {

        return connection.query(sQuery + "WHERE orcamentos.id=" + id + " ORDER BY id");
        
    }

    this.getCliente = function(connection, id){

        return connection.query(sQuery + "WHERE clientes.id=" + id + " ORDER BY id");

    }

    this.insereOrcamento = function(connection, vBody){
        
        return connection.query(
            "INSERT INTO orcamentos (id, idUsuario, idEquip, idCliente, valor, status) "+
            "values(" + vBody.id + ", " + vBody.usuario + "," + vBody.equipamento + "," + vBody.cliente + 
            "," + vBody.valor + ",'novo')");

    }

    this.getUser = function(connection, id){

        return connection.query(sQuery + "WHERE users.id=" + id + " ORDER BY id");
        
    }

	return this;
}