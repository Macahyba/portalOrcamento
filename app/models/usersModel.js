module.exports = function(){

    this.getUsers = function(connection){
        
        return connection.query("SELECT * FROM users");
    }

    this.getUsersDetalhado = function(connection, id){

        return connection.query(
            "SELECT orcamentos.id, nomeUsuario, nomeCliente, nomeEquip, serialNumber, valor, " +
            "status, dataCriacao " +
            "FROM orcamentos " +
            "LEFT JOIN users ON orcamentos.idUsuario=users.id " + 
            "LEFT JOIN equipamentos ON orcamentos.idEquip=equipamentos.id "+
            "LEFT JOIN clientes ON orcamentos.idCliente=clientes.id "+ 
            "WHERE users.id=" + id + " ORDER BY id");
        
    }
	return this;
}