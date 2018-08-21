module.exports = function(){

    this.getOrcamentos = function(connection){
        
        return connection.query(
            "SELECT orcamentos.id, idUsuario, nomeUsuario, nomeCliente, nomeEquip, serialNumber, valor, " +
            "status, dataCriacao " +
            "FROM orcamentos " +
            "LEFT JOIN users ON orcamentos.idUsuario=users.id " + 
            "LEFT JOIN equipamentos ON orcamentos.idEquip=equipamentos.id "+
            "LEFT JOIN clientes ON orcamentos.idCliente=clientes.id ORDER BY id");
    }

    this.getOrcamentoDetalhado = function(connection, id) {

        return connection.query(
            "SELECT orcamentos.id, nomeUsuario, nomeCliente, nomeEquip, serialNumber, valor, " +
            "status, dataCriacao " +
            "FROM orcamentos " +
            "LEFT JOIN users ON orcamentos.idUsuario=users.id " + 
            "LEFT JOIN equipamentos ON orcamentos.idEquip=equipamentos.id "+
            "LEFT JOIN clientes ON orcamentos.idCliente=clientes.id "+ 
            "WHERE orcamentos.id=" + id + " ORDER BY id");
        
    }

    this.insereOrcamento = function(connection, vBody){
        return connection.query(
            "INSERT INTO orcamentos (id, idUsuario, idEquip, idCliente, valor, status) "+
            "values(" + vBody.id + ", " + vBody.usuario + "," + vBody.equipamento + "," + vBody.cliente + 
            "," + vBody.valor + ",'novo')");

    }

	return this;
}