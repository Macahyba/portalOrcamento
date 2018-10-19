module.exports.inserirOrcGET = function(app, req, res){

    let connection = app.config.dbConnection();

    connection.connect()

    .then(()=>{
        
        let OrcamentosDAO = new app.models.OrcamentosDAO(connection);
        return OrcamentosDAO.getSumm()
    })

    .then(query=>{
        
        //res.render("orcamento/inserirOrc", {montaData : query, summData :JSON.stringify(query).replace(/\\/g, '\\\\').replace(/"/g, '\\\"')});
        res.render("orcamento/inserirOrc", {summData :JSON.stringify(query).replace(/\\/g, '\\\\').replace(/"/g, '\\\"')});
    })

    .catch(queryErr=>{
            
        res.status(500).render("erro", { error : queryErr});
    })
    
    .then(()=>{
        if (connection) { connection.end()}
    })

}

module.exports.inserirOrcPOST = function(app, req, res){

    //console.log(req.body)

    Object.keys(req.body).forEach(function(key) {
        if(!req.body[key]){ throw key + " is missing"; }
    })

    //console.log(req.body);
    let connection = app.config.dbConnection();

    connection.connect()

    .then(()=>{

        let OrcamentosDAO = new app.models.OrcamentosDAO(connection);
        
        return OrcamentosDAO.insereOrcamento(req.body, app.locals.user.id)
        //return true
    })

    .then((mail)=>{

        app.models.mail.sendMail(app, mail, 'insert');
    })

    .then(()=>{
        
        //res.send(query);
        res.redirect("/listaOrcamentos");
    })

    .catch(queryErr=>{
        console.log(queryErr);
        res.status(500).render("erro", { error : queryErr});
    })		
    
    .then(()=>{

        if (connection) { connection.end() }
    })
}