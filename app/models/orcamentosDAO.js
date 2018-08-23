module.exports = function(){

    let Promise = require("bluebird");
    let date = require('date-and-time');
    // dateStr USADO PARA GERAR ID COM BASE NA DATA
    let dateStr = date.format(new Date(), 'YYYYMMDD');

    // GERAR NUMERO PADDADO EM ZEROS PRO ID
    //.toLocaleString('en', {minimumIntegerDigits:4,useGrouping:false})

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

        let cliente = connection.query("SELECT id FROM clientes WHERE nomeCliente='" + vBody.cliente + "'");
        let equipamento = connection.query("SELECT id FROM equipamentos WHERE nomeEquip='" + vBody.equipamento + "' AND serialNumber='" + vBody.serialNumber + "'");
        
        Promise.props({'cliente' : cliente,'equipamento' : equipamento})

        .then(function(answ){
            //console.log(answ)
            if (!answ.cliente.length && !answ.equipamento.length){
                
                return connection.query("select * from users")
                /*
                .then(function(res){
                    console.log("ok");
                    console.log(res);
                    return connection.query("select * from users");
                })

                .catch(function(err){
                    console.log("bad "+err)
                })*/
                console.log("gera cliente e equip")
            } else if (!answ.cliente.length){
                //console.log(answ.cliente[0].id);
                console.log("gera cliente")
            } else if (!answ.equipamento.length) {
                //console.log(answ.equipamento[0].id);
                console.log("gera equip")
            }
            //console.log(answ.cliente[0].id +"----"+ answ.equipamento[0].id)
            console.log("insere na base");

            //connection.end();
           
        })

		/*.catch(function(connectionErr){
			
			console.log(connectionErr);
			res.status(500).render("erro", { error : connectionErr});
		});*/
        
        /*return connection.query(
            "INSERT INTO orcamentos (id, idUsuario, idEquip, idCliente, valor, status) "+
            "values(" + vBody.id + ", " + vBody.usuario + "," + vBody.equipamento + "," + vBody.cliente + 
            "," + vBody.valor + ",'novo')");*/


    }

    this.insereCliente = function(connection){
        
    }

    this.getUser = function(connection, id){

        return connection.query(sQuery + "WHERE users.id=" + id + " ORDER BY id");
        
    }

    this.getSumm = function(connection){

        let clientes = connection.query("SELECT distinct nomeCliente FROM clientes ORDER BY nomeCliente");
        let equipamentos = connection.query("SELECT distinct nomeEquip,serialNumber FROM equipamentos ORDER BY nomeEquip");

        return Promise.props({'cliente': clientes,'equip': equipamentos});
    }

    return this;
    
}