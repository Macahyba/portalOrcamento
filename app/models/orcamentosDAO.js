module.exports = function(){

    let Promise = require("bluebird");
    let date = require('date-and-time');
    
    // dateStr USADO PARA GERAR ID COM BASE NA DATA
    // let idOrc = .toLocaleString('en', {minimumIntegerDigits:4,useGrouping:false}) +
    // date.format(new Date(), 'YYYYMMDD');
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

    this.getClienteList = function(connection, id){

        return connection.query(sQuery + "WHERE clientes.id=" + id + " ORDER BY id");

    }

    this.getUserList = function(connection, id){

        return connection.query(sQuery + "WHERE users.id=" + id + " ORDER BY id");
        
    }

    this.getCliente = function(connection, nomeCliente){

        return connection.query("SELECT * FROM clientes WHERE nomeCliente='" + nomeCliente + "' ORDER BY id LIMIT 1");
        
    }    

    this.getEquip = function(connection,nomeEquip,serialNumber){

        return connection.query("SELECT * FROM equipamentos WHERE nomeEquip='" + nomeEquip + "' AND serialNumber='" + serialNumber + "' ORDER BY id LIMIT 1");
   
    }
///////////// VERIFICAR ESSA ROTINA
    this.insereOrcamento = function(connection, vBody){

        //let cliente = connection.query("SELECT id FROM clientes WHERE nomeCliente='" + vBody.cliente + "'");
        let cliente = this.getCliente(connection, vBody.nomeCliente);
        //let equipamento = connection.query("SELECT id FROM equipamentos WHERE nomeEquip='" + vBody.equipamento + "' AND serialNumber='" + vBody.serialNumber + "'");
        let equipamento = this.getEquip(connection, vBody.nomeEquip,vBody.serialNumber);

        return Promise.props({  'cliente' : cliente, 
                                'equipamento' : equipamento, 
                                'newCliente' : {
                                    'nomeCliente' : vBody.nomeCliente,
                                    'newCNPJ' : vBody.cnpj
                                }, 
                                'newEquip': {
                                    'nomeEquip' : vBody.nomeEquip,
                                    'serialNumber' : vBody.serialNumber
                                }
                            })

        .then((answ)=>{
            console.log("0"+JSON.stringify(answ,null,4))
            if (!answ.cliente.length && !answ.equipamento.length){
                
                console.log("gera cliente e equip")
                //console.log(connection,answ.newEquip.nomeEquip,answ.newEquip.serialNumber);
                let qInsEquip =  this.insereEquip(connection, answ.newEquip.nomeEquip, answ.newEquip.serialNumber); 
                let qInsCliente = this.insereCliente(connection, answ.newCliente.nomeCliente, answ.newCliente.newCNPJ);

                return Promise.props({ 'idCliente' : qInsCliente, 'idEquip' :  qInsEquip})

                .then((res)=>{
                    console.log("1 "+JSON.stringify(res,null,4))
                    return res;
                })
                


            } else if (!answ.cliente.length){
                
                console.log("gera cliente")
                //let qInsCliente = 
                return this.insereCliente(connection, answ.newCliente.nomeCliente, answ.newCliente.newCNPJ)

                .then((res)=>{

                    let c =  ({ 'idCliente' : res, 
                                'idEquip' :  {
                                    'insertId': equipamento.id
                                }
                            })
                
                    console.log("1 "+JSON.stringify(c,null,4))
                    return c;
                //return Promise.props({ 'idCliente' : qInsCliente, 'idEquip' :  qInsEquip})
                })
            } else if (!answ.equipamento.length) {
                
                console.log("gera equip")
                //let qInsEquip =  
                return this.insereEquip(connection, answ.newEquip.nomeEquip, answ.newEquip.serialNumber)

                .then((res)=>{
                    let d =  ({ 'idEquip' : res, 
                                'idCliente' :  {
                                    'insertId': cliente.id
                                }
                            })
                
                    console.log("1 "+JSON.stringify(d,null,4))
                    return d;
                //return Promise.props({ 'idCliente' : qInsCliente, 'idEquip' :  qInsEquip})
                })
            }

           
        })

        .then((res)=>{
            console.log("2 "+JSON.stringify(res,null,4));
            //console.log(vBody.idUsuario, res.idEquip.insertId, res.idCliente.insertId, vBody.valor);
            return this.gravaOrcamento(connection, vBody.idUsuario, res.idEquip.insertId, res.idCliente.insertId, vBody.valor);

        })

    }

    this.getIncr = function(connection,id){
        
        return connection.query("SELECT RIGHT(MAX(id),3) as id FROM orcamentos WHERE idCliente=" + id)

    }

    this.getSumm = function(connection){

        let clientes = connection.query("SELECT distinct nomeCliente FROM clientes ORDER BY nomeCliente");
        let equipamentos = connection.query("SELECT distinct nomeEquip,serialNumber FROM equipamentos ORDER BY nomeEquip");

        return Promise.props({'cliente': clientes,'equip': equipamentos});
    
    }

    this.insereEquip = function(connection, nomeEquip, serialNumber){

        return connection.query("INSERT INTO equipamentos (nomeEquip, serialNumber) VALUES('" + nomeEquip + "','" + serialNumber + "')")

    }

    this.insereCliente = function(connection, nomeCliente, cnpj){

        return connection.query("INSERT INTO clientes (nomeCliente, cnpj) VALUES('" + nomeCliente + "','" + cnpj + "')")

    }

    this.gravaOrcamento = function(connection, idUsuario, idEquip, idCliente, valor){

        return this.getIncr(connection, idCliente)

        .then((res)=>{

            return date.format(new Date(), 'YYYYMM')+
                        idCliente.toLocaleString('en', {minimumIntegerDigits:3,useGrouping:false}) +
                        ((res.id||0)+1).toLocaleString('en', {minimumIntegerDigits:3,useGrouping:false});

            
        })

        .then((idOrc)=>{    
            
            return connection.query("INSERT INTO orcamentos (id, idUsuario, idEquip, idCliente, valor, status) VALUES("+
            idOrc + "," + idUsuario + "," + idEquip + "," + idCliente + "," + valor + ",'novo')");

        })

    }

    return this;
    
}