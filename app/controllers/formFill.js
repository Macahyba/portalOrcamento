module.exports.formFill = function(app, req, res){

    let table = req.url.split("/")[2];
    let field = req.url.split("/")[3].replace(/%20/g," ");
    let conn;

    app.config.dbConnection()

    .then(function(connection){

        conn = connection;

        let OrcamentosDAO = new app.app.models.OrcamentosDAO(connection);

        switch (table){

            case "cnpj":
                return OrcamentosDAO.getCNPJ(field);
            case "serialNumber":
                return OrcamentosDAO.getSerialNumber(field);
        }
    })

    .then(function(data){

        res.send(data);
    })

    .finally(function(){
        if (conn) { conn.end()}
    })

}