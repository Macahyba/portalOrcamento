module.exports.listaOrcamentos = function(app, req, res){

    let conn;

    app.config.dbConnection()
    
    .then(function(connection){
    
        let OrcamentosDAO = new app.app.models.OrcamentosDAO(connection);
        conn = connection;
        return OrcamentosDAO.getOrcamentos()
    })

    .then(function(query) {

        res.render("orcamento/listaOrcamentos", {detalhe : query});	
    })

    .catch(function(err){
        
        //console.log(err);
        res.status(500).render("erro", { error : err});
    })

    .finally(function(){
        
        if (conn) { conn.end()} ;
    })

}

module.exports.detalhes = function(app, req, res){

    let conn;
    let path = req.url.split("/")[1];
    let id = req.url.split("/")[2];

    app.config.dbConnection()
    
    .then(function(connection){

        let OrcamentosDAO = new app.app.models.OrcamentosDAO(connection);

        conn = connection;
        
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

    .then(function(query) {

        res.render("orcamento/" + path, {detalhe : query});	
    })

    .catch(function(err){
        
        res.status(500).render("erro", { error : err});
    })		
    
    .finally(function(){
        
        if (conn) { conn.end()} ;
    })

}