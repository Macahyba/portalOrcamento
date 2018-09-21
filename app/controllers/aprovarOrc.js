module.exports.aprova = function(app, req, res) {

    let conn;
    //console.log(JSON.stringify(req.body,null,4))
    app.config.dbConnection()

    .then(function(connection) {

        let OrcamentosDAO = new app.app.models.OrcamentosDAO(connection);
        conn = connection;
        return OrcamentosDAO.aprovarOrc(req.body)
    })

    .then(function(query){
        //console.log(JSON.stringify(query,null,4))
        let orc = app.app.models.orcamentos.montaOrc(app, query[0]);
        //console.log(answ);
        // DON'T NEED TO SEND, AJAX FETCHES THE RETURN VALUE
        res.send(orc);
    })

    .catch(function(err){
        
        //console.log(err);
        res.status(500).render("erro", { error : err});
    })

    .finally(function(){

        if (conn) { conn.end(); }
    })
}