let moment = require('moment');

module.exports.lista = function(app, req, res){

    let connection = app.config.dbConnection();

    connection.connect()
    
    .then(()=>{
    
        let OrcamentosDAO = new app.models.OrcamentosDAO(connection);
        return OrcamentosDAO.getOrcamentos()
    })

    .then(query=>{

        res.render("orcamento/listaOrcamentos", {detalhe : query.rows, moment : moment, app: app});	
    })

    .catch(err=>{
        
        //console.log(err);
        res.status(500).render("erro", { error : err});
    })

    .then(()=>{
        
        if (connection) { connection.end()} ;
    })

}

module.exports.detalhes = function(app, req, res){

    let path = req.url.split("/")[2];
    let id = req.url.split("/")[3];

    let connection = app.config.dbConnection();

    connection.connect()
    
    .then(()=>{

        let OrcamentosDAO = new app.models.OrcamentosDAO(connection);
      
        switch (path){
            case "clienteDetalhe":
                return OrcamentosDAO.getClienteList(id)
                break;
            case "orcDetalhe":
                return OrcamentosDAO.getOrcamentoDetalhado(id)
                break;
            case "userDetalhe":
                return OrcamentosDAO.getUserList(id)
                break;
            default :
                throw "Routing error!"
        }

    })

    .then(query=> {

        res.render("orcamento/" + path, {detalhe : query.rows, app: app});	
    })

    .catch(err=>{
        
        res.status(500).render("erro", { error : err});
    })		
    
    .then(()=>{
        
        if (connection) { connection.end()} ;
    })

}

module.exports.download = function(app, req, res) {

    //console.log(JSON.stringify(req.body, null, 4))
    app.models.PDFGen.download(app, req.body.id, res);
}