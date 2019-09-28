module.exports.lista = function(app, req, res){

    let connection = app.config.dbConnection();

    connection.connect()
    
    .then(()=>{
    
        let OrcamentosDAO = new app.dao.OrcamentosDAO(connection);
        return OrcamentosDAO.getOrcamentos()
    })

    .then(query=>{

        res.render("orcamento/listaOrcamentos", {detalhe : query.rows, app: app});	
    })

    .catch(err=>{
        
        //console.log(err);
        res.status(500).render("erro", { error : err});
    })

    .then(()=>{
        
        if (connection) { connection.end()}
    })

}

module.exports.detalhes = function(app, req, res){

    let path = req.url.split("/")[2];
    let id = req.url.split("/")[3];

    let connection = app.config.dbConnection();

    connection.connect()
    
    .then(()=>{

        let OrcamentosDAO = new app.dao.OrcamentosDAO(connection);
      
        // FUTURE IMPLEMENTATION
        /*
        switch (path){
            case "clienteDetalhe":
                return OrcamentosDAO.getClienteList(id)
            case "orcDetalhe":
                return OrcamentosDAO.getOrcamentoDetalhado(id)
            case "userDetalhe":
                return OrcamentosDAO.getUserList(id)
            default :
                throw new Error("Routing error!");
        }
        */
        if (path == "orcDetalhe") { 

            return OrcamentosDAO.getOrcamentoDetalhado(id)

        } else {

            throw new Error("Routing error!");

        }

    })

    .then(query=> {

        res.render("orcamento/" + path, {detalhe : query.rows, app: app});	
    })

    .catch(err=>{
        
        res.status(500).render("erro", { error : err});
    })		
    
    .then(()=>{
        
        if (connection) { connection.end()}
    })

}

module.exports.download = function(app, req, res) {

    //console.log(JSON.stringify(req.body, null, 4))
    app.models.PDFGen.download(app, req.body.id, res);
}