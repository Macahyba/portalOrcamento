module.exports = function(app){
    
    app.get('/geral', function(req, res){

        var pConnection = app.config.dbConnection();

        pConnection.then(function(connection){

            var pQuery = connection.db("orcamentos").collection("orcamentos").find().toArray();

            pQuery.then(function(query){

                //query = 
            });
        });

        res.render("orcamento/geral");
    
    })
}