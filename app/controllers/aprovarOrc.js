module.exports.aprova = function(app, req, res) {

    //console.log(JSON.stringify(req.body,null,4))
    let connection = app.config.dbConnection();
    let aprovaRes;

    connection.connect()

    .then(()=> {

        let OrcamentosDAO = new app.models.OrcamentosDAO(connection);        
        return OrcamentosDAO.aprovarOrc(req.body);
    })

    .then((mail)=>{

        aprovaRes = mail;
        if (mail.rows[0].status == 'APROVADO') {
        
            app.models.PDFGen.createHTML(req.body.id)

            .then(html=>{

                return app.models.PDFGen.exportPDF(html, req.body.id)
            })

            .then(()=>{

                app.models.mail.sendMail(mail.rows[0], app, 'approve');
            })
            
        }
    })

    .then(()=>{

        let orc = app.models.orcamentos.montaOrc(app, aprovaRes.rows[0]);
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