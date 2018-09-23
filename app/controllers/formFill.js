module.exports.formFill = function(app, req, res){

    let table = req.url.split("/")[2];
    let field = req.url.split("/")[3].replace(/%20/g," ");

    let connection = app.config.dbConnection();

    connection.connect()

    .then(()=>{

        let OrcamentosDAO = new app.models.OrcamentosDAO(connection);

        switch (table){

            case "cnpj":
                return OrcamentosDAO.getCNPJ(field);
            case "serialNumber":
                return OrcamentosDAO.getSerialNumber(field);
        }
    })

    .then(data=>{

        res.send(data);
    })

    .then(()=>{
        if (connection) { connection.end()}
    })

}