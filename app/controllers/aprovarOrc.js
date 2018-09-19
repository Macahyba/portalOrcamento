module.exports.aprova = function(app, req, res) {

    let conn;

    app.config.dbConnection()

    .then(function(connection) {

        let OrcamentosDAO = new app.app.models.OrcamentosDAO(connection);
        conn = connection;
        return OrcamentosDAO.aprovarOrc(req.body)
    })

    .then(function(){

        res.redirect("/listaOrcamentos")
    })

    .catch(function(err){
        
        //console.log(err);
        res.status(500).render("erro", { error : err});
    })

    .finally(function(){

        if (conn) { conn.end(); }
    })
}