module.exports.aprova = function(app, req, res) {

    //console.log(JSON.stringify(req.body,null,4))
    let connection = app.config.dbConnection();
    //let aprovaRes;

    connection.connect()

    .then(()=> {

        let OrcamentosDAO = new app.models.OrcamentosDAO(connection);        
        return OrcamentosDAO.aprovarOrc(req.body, app.locals.user.id);
    })

    .then((mail)=>{
        //console.log(JSON.stringify(mail.rows[0],null,4))
        //aprovaRes = mail;
        res.send(mail.rows[0]);

        if (mail.rows[0].status == 'APROVADO') {
        
            app.models.PDFGen.exportPDF(app, mail.rows[0].id)

            .then(()=>{

                app.models.mail.sendMail(app, mail.rows[0], 'approve');
            })
            
        }
    })
/*
    .then(()=>{
        
        let orc = app.models.orcamentos.montaOrc(app, aprovaRes.rows[0]);
        // DON'T NEED TO SEND, AJAX FETCHES THE RETURN VALUE
        res.send(orc);
    })
*/
    .catch(err=>{
        
        //console.log(err);
        res.status(500).render("erro", { error : err});
    })

    .then(()=>{

        if (connection) { connection.end(); }
    })
}