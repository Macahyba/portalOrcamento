function OrcamentosDAO (connection) {

    this._connection = connection;
    this._Promise = require("bluebird");
    this._date = require('date-and-time');
    this._sQuery =
    "SELECT orcamentos.id, idUsuario, nomeUsuario, idCliente, nomeCliente, idEquip, nomeEquip, serialNumber, valor, " +
    "status, dataCriacao " +
    "FROM orcamentos " +
    "LEFT JOIN users ON orcamentos.idUsuario=users.id " + 
    "LEFT JOIN equipamentos ON orcamentos.idEquip=equipamentos.id "+
    "LEFT JOIN clientes ON orcamentos.idCliente=clientes.id ";
}

OrcamentosDAO.prototype.getOrcamentos = function(){
 
    return this._connection.query(this._sQuery + "ORDER BY id");

}

OrcamentosDAO.prototype.getOrcamentoDetalhado = function(id) {

    return this._connection.query(this._sQuery + "WHERE orcamentos.id=" + id + " ORDER BY id");
    
}

OrcamentosDAO.prototype.getClienteList = function(id){

    return this._connection.query(this._sQuery + "WHERE clientes.id=" + id + " ORDER BY id");

}

OrcamentosDAO.prototype.getUserList = function(id){

    return this._connection.query(this._sQuery + "WHERE users.id=" + id + " ORDER BY id");
    
}

OrcamentosDAO.prototype.getCliente = function(nomeCliente, cnpj, responsavel){

    return this._connection.query(    "SELECT * FROM clientes WHERE nomeCliente='" + nomeCliente + "' AND cnpj='" + cnpj + "' " +
                                "AND responsavel='" + responsavel + "' ORDER BY id LIMIT 1");
    
}    

OrcamentosDAO.prototype.getEquip = function(nomeEquip,serialNumber){

    return this._connection.query(    "SELECT * FROM equipamentos WHERE nomeEquip='" + nomeEquip + "' " +
                                "AND serialNumber='" + serialNumber + "' ORDER BY id LIMIT 1");

}

OrcamentosDAO.prototype.insereOrcamento = function(vBody){

    let cliente = this.getCliente(vBody.nomeCliente, vBody.cnpj, vBody.responsavel);
    let equipamento = this.getEquip(vBody.nomeEquip,vBody.serialNumber);

    return this._Promise.props({  'cliente' : cliente, 
                            'equipamento' : equipamento, 
                            'newCliente' : {
                                'nomeCliente' : vBody.nomeCliente,
                                'newCNPJ' : vBody.cnpj,
                                'newResp' : vBody.responsavel
                            }, 
                            'newEquip': {
                                'nomeEquip' : vBody.nomeEquip,
                                'serialNumber' : vBody.serialNumber
                            }
                        })

    .then((answ)=>{
        //console.log("answ:"+JSON.stringify(answ,null,4))
        if (!answ.cliente.length && !answ.equipamento.length){
            
            //console.log("gera cliente e equip")
            //console.log(connection,answ.newEquip.nomeEquip,answ.newEquip.serialNumber);
            let qInsEquip =  this.insereEquip(answ.newEquip.nomeEquip, answ.newEquip.serialNumber); 
            let qInsCliente = this.insereCliente(answ.newCliente.nomeCliente, answ.newCliente.newCNPJ, answ.newCliente.newResp);

            return this._Promise.props({ 'idCliente' : qInsCliente, 'idEquip' :  qInsEquip})

            .then((res)=>{
                //console.log("ambos "+JSON.stringify(res,null,4))
                return res;
            })
            


        } else if (!answ.cliente.length){
            //console.log("gera cliente: "+JSON.stringify(answ.equipamento[0]['id'],null,4))
            //let qInsCliente = 
            return this.insereCliente(answ.newCliente.nomeCliente, answ.newCliente.newCNPJ, answ.newCliente.newResp)

            .then((res)=>{
                //console.log("res de cliente: "+JSON.stringify(res,null,4));                    
                return this._Promise.props({ 'idCliente' : res, 
                            'idEquip' :  {
                                'insertId': answ.equipamento[0]['id']
                            }
                        })
            })
        } else if (!answ.equipamento.length) {
            
            //console.log("gera equip: "+JSON.stringify(answ.cliente[0]['id'],null,4))
            //let qInsEquip =  
            return this.insereEquip(answ.newEquip.nomeEquip, answ.newEquip.serialNumber)

            .then((res)=>{
                //console.log("res de equip: "+JSON.stringify(res,null,4));
                return ({   'idCliente' :  {
                                'insertId': answ.cliente[0]['id']},
                            'idEquip' : res
                        })
            })

        } else {

            return Promise.props({  'idCliente': { 
                                        'insertId' : answ.cliente[0]['id']},
                                    'idEquip': {
                                        'insertId' : answ.equipamento[0]['id']}
                                })
        }

       
    })

    .then((res)=>{
        //throw "end of test"
        return this.gravaOrcamento(vBody.idUsuario, res.idEquip.insertId, res.idCliente.insertId, vBody.valor);

    })

}

OrcamentosDAO.prototype.getIncr = function(id){
    
    return this._connection.query("SELECT RIGHT(MAX(id)+1,3) as id FROM orcamentos WHERE idCliente=" + id)

}

OrcamentosDAO.prototype.getSumm = function(){

    //SELECT distinct nomeCliente,cnpj,responsavel,(select count(*) from orcamentos where idCliente=p.id) as total FROM clientes p ORDER BY nomeCliente ASC, total DESC;
    let clientes = this._connection.query("SELECT distinct nomeCliente,cnpj FROM clientes ORDER BY nomeCliente");
    let equipamentos = this._connection.query("SELECT distinct nomeEquip FROM equipamentos ORDER BY nomeEquip");
    
    /* 
    FUTURE IMPLEMENTATION, RETRIEVE SERIALNUMBER AND SEND TO DATALIST
        let equipamentos = connection.query("SELECT GROUP_CONCAT(" +
                                        "JSON_OBJECT('nomeEquip', nomeEquip, 'serialNumber', (SELECT DISTINCT CONCAT('[', GROUP_CONCAT(serialNumber),"+
                                        "']') FROM equipamentos where nomeEquip=p.nomeEquip))) as json from equipamentos p group by nomeEquip");
    */

    return this._Promise.props({'cliente': clientes,'equip': equipamentos});

}

OrcamentosDAO.prototype.insereEquip = function(nomeEquip, serialNumber){

    return this._connection.query("INSERT INTO equipamentos (nomeEquip, serialNumber) VALUES(UPPER('" + nomeEquip + "'), UPPER('" + serialNumber + "'))")

}

OrcamentosDAO.prototype.insereCliente = function(nomeCliente, cnpj, responsavel){

    return this._connection.query(    "INSERT INTO clientes (nomeCliente, cnpj, responsavel) VALUES(UPPER('" + nomeCliente + "'), UPPER('" + cnpj + "')" +
                                ", UPPER('" + responsavel + "'))");

}

OrcamentosDAO.prototype.gravaOrcamento = function(idUsuario, idEquip, idCliente, valor){

    return this.getIncr(idCliente)

    .then((res)=>{

        return this._date.format(new Date(), 'YYYYMM')+
                    idCliente.toLocaleString('en', {minimumIntegerDigits:3,useGrouping:false}) +
                    ((parseInt(res[0].id)||0)).toLocaleString('en', {minimumIntegerDigits:3,useGrouping:false})

        
    })

    .then((idOrc)=>{    
        
        return this._connection.query("INSERT INTO orcamentos (id, idUsuario, idEquip, idCliente, valor, status) VALUES("+
        idOrc + "," + idUsuario + "," + idEquip + "," + idCliente + "," + valor + ",'novo')");

    })

}



module.exports = function(){

    return OrcamentosDAO;    
}