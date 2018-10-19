function OrcamentosDAO (connection) {

    this._connection = connection;
    this._Promise = require("bluebird");
    this._date = require('date-and-time');
}

OrcamentosDAO.prototype.getOrcamentos = function(){
 
    return this._connection.query(  "SELECT orcamentos.id, nomecliente, nomeequip, serialnumber, valor, desconto, status, datacriacao " +
                                    "FROM orcamentos " +
                                    "LEFT JOIN users ON orcamentos.idusuario=users.id " + 
                                    "LEFT JOIN equipamentos ON orcamentos.idequip=equipamentos.id "+
                                    "LEFT JOIN clientes ON orcamentos.idcliente=clientes.id ORDER BY datacriacao DESC");

}

OrcamentosDAO.prototype.getOrcamentoDetalhado = function(id) {

    return this._connection.query(  "SELECT orcamentos.id, r1.nome as nomecriador, r1.id as idusuario, nomecliente, nomecompleto, cnpj, departamento, responsavel, " + 
                                    "nomeequip, serialnumber, valor, desconto, status, datacriacao, r2.nome as nomeaprov, r2.cargo, r2.telefone, dataaprov " +
                                    "FROM orcamentos " +
                                    "LEFT JOIN users r1 ON orcamentos.idusuario=r1.id " + 
                                    "LEFT JOIN users r2 ON orcamentos.iduseraprov=r2.id " + 
                                    "LEFT JOIN equipamentos ON orcamentos.idequip=equipamentos.id "+
                                    "LEFT JOIN clientes ON orcamentos.idcliente=clientes.id WHERE orcamentos.id=$1", [id]);

}
/* FUTURE IMPLEMENTATION
OrcamentosDAO.prototype.getClienteList = function(id){

    return this._connection.query(  "SELECT orcamentos.id, idusuario, nome, login, idcliente, nomecliente, nomecompleto, departamento, " +
                                    "idEquip, nomeequip, serialnumber, valor, desconto, status, datacriacao " +
                                    "FROM orcamentos " +
                                    "LEFT JOIN users ON orcamentos.idusuario=users.id " + 
                                    "LEFT JOIN equipamentos ON orcamentos.idequip=equipamentos.id "+
                                    "LEFT JOIN clientes ON orcamentos.idcliente=clientes.idWHERE clientes.nomecliente=(SELECT nomecliente FROM clientes " +
                                    "WHERE id=$1) ORDER BY datacriacao", [id]);

}

OrcamentosDAO.prototype.getUserList = function(id){

    return this._connection.query(  "SELECT orcamentos.id, idusuario, nome, login, idcliente, nomecliente, nomecompleto, departamento, " +
                                    "idEquip, nomeequip, serialnumber, valor, desconto, status, datacriacao " +
                                    "FROM orcamentos " +
                                    "LEFT JOIN users ON orcamentos.idusuario=users.id " + 
                                    "LEFT JOIN equipamentos ON orcamentos.idequip=equipamentos.id "+
                                    "LEFT JOIN clientes ON orcamentos.idcliente=clientes.idWHERE users.id=$1 ORDER BY id", [id]);
    
}
*/
OrcamentosDAO.prototype.getCliente = function(nomeCliente, cnpj, responsavel){

    return this._connection.query(  "SELECT * FROM clientes WHERE nomecliente=$1 AND cnpj=$2 AND responsavel=$3 ORDER BY id LIMIT 1",
                                    [nomeCliente, cnpj, responsavel]);
    
}    

OrcamentosDAO.prototype.getEquip = function(nomeEquip,serialNumber){

    return this._connection.query(  "SELECT * FROM equipamentos WHERE nomeequip=$1 AND serialnumber=$2 ORDER BY id LIMIT 1",
                                    [nomeEquip, serialNumber]);

}

OrcamentosDAO.prototype.insereOrcamento = function(vBody, id){

    let cliente = this.getCliente(vBody.nomeCliente.trim(), vBody.cnpj.trim(), vBody.responsavel.trim(), vBody.departamento.trim());
    let equipamento = this.getEquip(vBody.nomeEquip.trim(),vBody.serialNumber.trim());

    return this._Promise.props({  
                                'cliente' : cliente, 
                                'equipamento' : equipamento, 
                                'newCliente' : {
                                    'nomeCliente' : vBody.nomeCliente,
                                    'nomeCompleto' : vBody.nomeCompleto,
                                    'newCNPJ' : vBody.cnpj,
                                    'newResp' : vBody.responsavel,
                                    'newDepto' : vBody.departamento
                                }, 
                                'newEquip': {
                                    'nomeEquip' : vBody.nomeEquip,
                                    'serialNumber' : vBody.serialNumber
                                }
                            })

    .then((answ)=>{
        //console.log("answ:"+JSON.stringify(answ,null,4))
        if (!answ.cliente.rowCount && !answ.equipamento.rowCount){
            
            //console.log("gera cliente e equip")
            //console.log(connection,answ.newEquip.nomeEquip,answ.newEquip.serialNumber);
            let qInsEquip =  this.insereEquip(answ.newEquip.nomeEquip, answ.newEquip.serialNumber); 
            let qInsCliente =   this.insereCliente(answ.newCliente.nomeCliente, answ.newCliente.nomeCompleto, 
                                answ.newCliente.newCNPJ, answ.newCliente.newResp, answ.newCliente.newDepto);

            return this._Promise.props({ 'idCliente' : qInsCliente, 'idEquip' :  qInsEquip})

            .then((res)=>{
                //console.log("ambos "+JSON.stringify(res,null,4))
                return this._Promise.props({    'idCliente' : { 'id': res.idCliente.rows[0].id },
                                                'idEquip' :  { 'id': res.idEquip.rows[0].id }
                })
            })
            


        } else if (!answ.cliente.rowCount){
            //console.log("gera cliente: "+JSON.stringify(answ.equipamento.rows[0].id,null,4))
            //let qInsCliente = 
            return this.insereCliente(answ.newCliente.nomeCliente, answ.newCliente.nomeCompleto, 
                        answ.newCliente.newCNPJ, answ.newCliente.newResp, answ.newCliente.newDepto)

            .then((res)=>{
                //console.log("res de cliente: "+JSON.stringify(res,null,4));                    
                return this._Promise.props({ 'idCliente' : res.rows[0], 
                            'idEquip' :  {
                                'id': answ.equipamento.rows[0].id
                            }
                        })
            })
        } else if (!answ.equipamento.rowCount) {
            
            //console.log("gera equip: "+JSON.stringify(answ.cliente.rows[0].id,null,4))
            //let qInsEquip =  
            return this.insereEquip(answ.newEquip.nomeEquip, answ.newEquip.serialNumber)

            .then((res)=>{
                //console.log("res de equip: "+JSON.stringify(res,null,4));
                return ({   'idCliente' :  {
                                'id': answ.cliente.rows[0].id},
                            'idEquip' : res.rows[0]
                        })
            })

        } else {

            return this._Promise.props({  'idCliente': { 
                                        'id' : answ.cliente.rows[0].id},
                                    'idEquip': {
                                        'id' : answ.equipamento.rows[0].id}
                                })
        }

       
    })

    .then((res)=>{
        //throw "end of test"
        //console.log(id, res.idEquip.id, res.idCliente.id, vBody.valor)
        return this.gravaOrcamento(id, res.idEquip.id, res.idCliente.id, vBody.valor, vBody.desconto);

    })

}

OrcamentosDAO.prototype.getIncr = function(id){
    
    return this._connection.query(  "SELECT RIGHT(to_char(MAX(id)+1,'fm000000000000'),3) as id FROM orcamentos WHERE idCliente=$1",
                                    [id])

}

OrcamentosDAO.prototype.getSumm = function(){

    //SELECT distinct nomeCliente,cnpj,responsavel,(select count(*) from orcamentos where idCliente=p.id) as total FROM clientes p ORDER BY nomeCliente ASC, total DESC;
    let clientes = this._connection.query("SELECT distinct nomecliente FROM clientes ORDER BY nomecliente");
    let equipamentos = this._connection.query("SELECT distinct nomeequip FROM equipamentos ORDER BY nomeequip");

    return this._Promise.props({'cliente': clientes,'equip': equipamentos});

}

OrcamentosDAO.prototype.insereEquip = function(nomeEquip, serialNumber){

    return this._connection.query(  "INSERT INTO equipamentos (nomeequip, serialnumber) VALUES(UPPER($1), UPPER($2)) RETURNING *",
                                    [nomeEquip, serialNumber])

}

OrcamentosDAO.prototype.insereCliente = function(nomeCliente, nomeCompleto, cnpj, responsavel, departamento){

    return this._connection.query(  "INSERT INTO clientes (nomecliente, nomecompleto, cnpj, responsavel, departamento) " +
                                    "VALUES(UPPER($1), UPPER($2), UPPER($3), UPPER($4), UPPER($5)) RETURNING *",
                                    [nomeCliente, nomeCompleto, cnpj, responsavel, departamento]);

}

OrcamentosDAO.prototype.gravaOrcamento = function(idusuario, idEquip, idCliente, valor, desconto){

    return this.getIncr(idCliente)

    .then((res)=>{

        return this._date.format(new Date(), 'YYYYMM')+
                    idCliente.toLocaleString('en', {minimumIntegerDigits:3,useGrouping:false}) +
                    ((parseInt(res.rows[0].id)||0)).toLocaleString('en', {minimumIntegerDigits:3,useGrouping:false})

        
    })

    .then((id)=>{    
        
        let qInsert = this._connection.query(   "INSERT INTO orcamentos (id, idusuario, idequip, idcliente, valor, desconto, status) VALUES($1, $2, $3, $4, $5, $6, 'NOVO')",
                                                [id, idusuario, idEquip, idCliente, valor, desconto]);

        return this._Promise.props({ 'qInsert' : qInsert, 'id' : id , 'idusuario' : idusuario })                                    

    })

}

OrcamentosDAO.prototype.getCNPJ = function(nomeCliente){

    //return this._connection.query("SELECT DISTINCT cnpj, responsavel FROM clientes WHERE nomeCliente='" + nomeCliente + "'");
    return this._connection.query(  "SELECT distinct nomecliente, nomecompleto, cnpj, responsavel, departamento,(select count(*) from orcamentos where idcliente=p.id) " +
                                    "as total FROM clientes p where nomecliente=UPPER($1) ORDER BY nomecliente ASC, total DESC", [nomeCliente]);

}

OrcamentosDAO.prototype.getSerialNumber = function(nomeEquip){

    return this._connection.query(  "SELECT distinct nomeequip, serialnumber, (select count(*) from orcamentos where idequip=p.id) " +
                                    "as total FROM equipamentos p where nomeequip=UPPER($1) ORDER BY nomeequip ASC, total DESC", [nomeEquip]);
}

OrcamentosDAO.prototype.aprovarOrc = function(vBody, id){

    return this._connection.query(  "UPDATE orcamentos SET status=$1, iduseraprov=$2, dataaprov=now() WHERE id=$3", [vBody.status, id, vBody.id])

    .then(()=>{

        return this.getOrcamentoDetalhado(vBody.id)
    })

}

module.exports = function(){

    return OrcamentosDAO;    
}