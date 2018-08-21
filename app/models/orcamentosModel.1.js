/*module.exports = function(){

    this.getOrcamentos = function(connection){

        pGetOrcamentos (connection);

        return this;
    }
    
    
    function pGetOrcamentos (conn){
        return new Promise(function(resolve, reject){
            conn.query(
                "SELECT orcamentos.id, nomeCliente, nomeEquip, serialNumber, valor, nomeUsuario, dataCriacao " +
                "FROM orcamentos " +
                "LEFT JOIN users ON orcamentos.idUsuario=users.id " + 
                "LEFT JOIN equipamentos ON orcamentos.idEquip=equipamentos.id "+
                "LEFT JOIN clientes ON orcamentos.idCliente=clientes.id ORDER BY id", function(err, query){
                    if (err) { 
                        reject (err);
                    } else {
                        resolve(query); 
                    }

                });

            //.then(function(query){
            // return this;
            //})
        })
    }    
}*/