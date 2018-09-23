module.exports.aprova = function(app, req, res) {

    //console.log(JSON.stringify(req.body,null,4))
    let connection = app.config.dbConnection();

    connection.connect()

    .then(()=> {

        let OrcamentosDAO = new app.models.OrcamentosDAO(connection);        
        return OrcamentosDAO.aprovarOrc(req.body)
    })

    .then(query=>{
        
        let orc = app.models.orcamentos.montaOrc(app, query.rows[0]);
        //console.log(answ);
        // DON'T NEED TO SEND, AJAX FETCHES THE RETURN VALUE
        res.send(orc);
    })

    .catch(err=>{
        
        //console.log(err);
        res.status(500).render("erro", { error : err});
    })

    .then(()=>{

        if (connection) { connection.end(); }
    })
}