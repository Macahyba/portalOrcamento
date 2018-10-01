module.exports.download = function(app, id, res){
    
    this.createHTML(app, id)

    .then(html=>{

        return this.exportPDF(html, id)
    })
    
    .then((file)=>{
        //console.log("baixar")
        res.download(file, id+'.pdf', function(err){
            if (err) {
                console.log(err)
            }
        });
    })
}

module.exports.createHTML = function(app, id){
    
    return new Promise((resolve, reject)=>{
        
        let connection = app.config.dbConnection();
        let path = require('path');
        let date = require('date-and-time');

        connection.connect()

        .then(()=>{

            let OrcamentosDAO = new app.models.OrcamentosDAO(connection);

            return OrcamentosDAO.getOrcamentoDetalhado(id);

        })

        .then(orcamento=>{

            if (!orcamento.rowCount) throw new Error("Id not found!");
  
            let html =

            '<!DOCTYPE html>'+
            '<html lang="pt-br">'+
            '    <head>'+
            '        <meta charset="utf-8">'+
            '        <meta http-equiv="X-UA-Compatible" content="IE=edge">'+
            '        <meta name="viewport" content="width=device-width, initial-scale=1">'+
            '        <title>Report</title>'+
            '        <link rel="stylesheet" type="text/css" href="' + path.join('file://', __dirname, '../public/bootstrap/css/bootstrap.min.css') + '">'+
            '        <link rel="stylesheet" type="text/css" href="' + path.join('file://', __dirname, '../public/css/style.css') + '">'+
            '    </head>'+
            '    <body>'+
            '        <div class="container-fluid">'+
            '            <img src="' + path.join('file://', __dirname, '../public/img/logo.png') + '">'+
            '            <h6 class="font-weight-bold">Sony Brasil Ltda.</h6>'+
            '            <ul class="list-unstyled">'+
            '                <li>Rua Werner Siemens, 111 | Condomínio e-Business Park | Prédio 1</li>'+
            '                <li>CEP: 05069-010 | Lapa | São Paulo | SP | Brasil</li>'+
            '                <li>Tel.: (11) 2196-9000 - Fax.: 2196-9186</li>'+
            '            </ul>'+
            '            <hr>'+
            '            <ul class="list-unstyled mb-1">'+
            '               <li class="font-weight-bold font-italic">' + orcamento.rows[0].nomecompleto + '</li>'+
            '               <li class="font-weight-bold font-italic">' + orcamento.rows[0].departamento + '</li>'+
            '            </ul>'+
            '            <div class="font-weight-bold font-italic">'+
            '                <span class="left">Cotação: ' + orcamento.rows[0].id + ' - ' + orcamento.rows[0].nomeequip + ' - Numero de Serie ' + orcamento.rows[0].serialnumber + '</span>'+
            '                <span class="right">Data: ' + date.format(new Date(), 'DD/MMM/YYYY') + '</span>'+
            '            </div>'+
            '            <table class="table text-center">'+
            '                <thead>'+
            '                    <tr style="height:50%>'+
            '                        <th rowspan="2" class="align-middle">Item</th>'+
            '                        <th rowspan="2" class="align-middle">QDE</th>'+
            '                        <th rowspan="2" class="align-middle">MODELO</th>'+
            '                        <th rowspan="2" class="align-middle">DESCRIÇÃO</th>'+
            '                        <th colspan="2" class="align-middle">VALOR NACIONAL</th>'+
            '                        <th rowspan="2" class="align-middle">DESCONTO</th>'+
            '                        <th rowspan="2" class="align-middle">V. LÍQUIDO</th>'+
            '                    </tr>'+
            '                    <tr>'+
            '                        <th>UNITÁRIO</th>'+
            '                        <th>TOTAL</th>'+
            '                    </tr>'+
            '                </thead>'+
            '                <tbody>'+
            '                </tbody>'+
            '            </table>'+
            '        </div>'+
            '        <script type="text/javascript" src="/public/scripts/jquery-3.3.1.min.js"></script>'+
            '        <script type="text/javascript" src="/public/bootstrap/js/bootstrap.min.js"></script>'+
            '        <script type="text/javascript" src="/public/scripts/script.js"></script>'+
            '    </body>'+
            '</html>'


            require('fs').writeFile('admin.ejs', html, (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
              });


            resolve(html)

        })

    })
}

module.exports.exportPDF = function(html, id){

    return new Promise((resolve, reject)=>{

        let pdf = require('html-pdf');
        let options =   { 
                        "format": 'A4',
                        "orientation" : 'landscape' 
                        };
        let file = './app/public/pdf/'+id+'.pdf';
        
        pdf.create(html, options).toFile(file, function(err, res) {

            if (err) reject(err);
            else {
                console.log(res);
                resolve(res.filename)
            }
        });
    
    })

}