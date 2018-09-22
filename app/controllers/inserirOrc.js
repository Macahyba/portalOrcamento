module.exports.inserirOrcGET = function(app, req, res){

    let conn;

    app.config.dbConnection()

    .then(function(connection){
        
        let OrcamentosDAO = new app.models.OrcamentosDAO(connection);
        conn = connection;
        return OrcamentosDAO.getSumm()
    })

    .then(function(query){

        //res.render("orcamento/inserirOrc", {montaData : query, summData :JSON.stringify(query).replace(/\\/g, '\\\\').replace(/"/g, '\\\"')});
        res.render("orcamento/inserirOrc", {summData :JSON.stringify(query).replace(/\\/g, '\\\\').replace(/"/g, '\\\"')});
    })

    .catch(function(queryErr){
            
        res.status(500).render("erro", { error : queryErr});
    })
    
    .finally(function(){
        if (conn) { conn.end()}
    })

}

module.exports.inserirOrcPOST = function(app, req, res){

    //console.log(req.body)
    let conn;

    Object.keys(req.body).forEach(function(key) {
        if(!req.body[key]){ throw key + " is missing"; }
    })

    //console.log(req.body);
    app.config.dbConnection()

    .then(function(connection){

        let OrcamentosDAO = new app.models.OrcamentosDAO(connection);
        conn = connection;
        
        return OrcamentosDAO.insereOrcamento(req.body, app.locals.user.id)
        //return true
    })

    .then((mail)=>{

        app.models.mail.sendMail(mail, app);
    })

    .then(function(){
        
        //res.send(query);
        res.redirect("/listaOrcamentos");
    })

    .catch(function(queryErr){
        console.log(queryErr);
        res.status(500).render("erro", { error : queryErr});
    })		
    
    .finally(function(){

        if (conn) { conn.end() }
    })
}