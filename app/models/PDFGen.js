module.exports.download = function(app, id, res){
    
    this.exportPDF(app, id)
    
    .then((file)=>{
        //console.log("baixar")
        res.download(file, id+'.pdf', function(err){
            if (err) {
                console.log(err)
            }
        });
    })
}

module.exports.exportPDF = function(app, id){

    return new Promise((resolve, reject)=>{

        let pdf = require('html-pdf');
        let options =   { 
                        "format": 'A4',
                        "orientation" : 'landscape' 
                        };
        let file = './app/public/pdf/'+id+'.pdf';
        let path = require('path');
        let date = require('date-and-time');

        let connection = app.config.dbConnection();

        connection.connect()

        .then(()=>{

            let OrcamentosDAO = new app.models.OrcamentosDAO(connection);

            return OrcamentosDAO.getOrcamentoDetalhado(id);

        })

        .then(orcamento=>{

            if (!orcamento.rowCount) throw new Error("Id not found!");

            let valLiq = Math.round(orcamento.rows[0].valor*(1- orcamento.rows[0].desconto/100));
            let descontoVal = Math.round((orcamento.rows[0].desconto/100)*orcamento.rows[0].valor);
            
            let html =
            '<!DOCTYPE html>'+
            '<html lang="pt-br">'+
            '   <head>'+
            '       <meta charset="utf-8">'+
            '       <meta http-equiv="X-UA-Compatible" content="IE=edge">'+
            '       <meta name="viewport" content="width=device-width, initial-scale=1">'+
            '       <title>Report</title>'+
            '       <link rel="stylesheet" type="text/css" href="' + path.join('file://', __dirname, '../public/css/pdf.css') + '">'+
            '   </head>'+
            '   <body>';
            
            if (process.env.ALT_PDF == 1) {

                html += '<div class="container-fluid small resiz">';
            
            } else {

                html += '<div class="container-fluid small">';

            }

            html +=
            '           <div class="row">'+
            '               <div class="col">'+
            '                   <img src="' + path.join('file://', __dirname, '../public/img/logo.png') + '">'+
            '                   <h6 class="font-weight-bold">Sony Brasil Ltda.</h6>'+
            '                   <ul class="list-unstyled">'+
            '                       <li>Rua Werner Siemens, 111 | Condomínio e-Business Park | Prédio 1</li>'+
            '                       <li>CEP: 05069-010 | Lapa | São Paulo | SP | Brasil</li>'+
            '                       <li>Tel.: (11) 2196-9000 - Fax.: 2196-9186</li>'+
            '                   </ul>'+
            '                   <hr>'+
            '                   <ul class="list-unstyled mb-1">'+
            '                       <li class="font-weight-bold font-italic">' + orcamento.rows[0].nomecompleto + '</li>'+
            '                       <li class="font-weight-bold font-italic">' + orcamento.rows[0].departamento + '</li>'+
            '                   </ul>'+
            '               </div>'+
            '           </div>'+
            '           <div class="row font-weight-bold font-italic">'+
            '               <div class="h-2">'+
            '                   <div class="left">Cotação: ' + orcamento.rows[0].id + ' - ' + orcamento.rows[0].nomeequip + ' - Numero de Serie ' + orcamento.rows[0].serialnumber + '</div>'+
            '                   <div class="right">Data: ' + date.format(new Date(), 'DD/MMM/YYYY') + '</div>'+
            '               </div>'+
            '           </div>'+
            '           <div class="row">'+
            '               <div class="col">'+
            '                   <table class="main-table text-center">'+
            '                       <thead>'+
            '                           <tr>'+
            '                               <th>ITEM</th>'+
            '                               <th>QDE</th>'+
            '                               <th>MODELO</th>'+
            '                               <th>DESCRIÇÃO</th>'+
            '                               <th>VALOR UNITÁTIO</th>'+
            '                               <th>VALOR TOTAL</th>'+
            '                               <th>DESCONTO</th>'+
            '                               <th>V. LÍQUIDO</th>'+
            '                           </tr>'+
            '                       </thead>'+
            '                       <tbody>'+
            '                           <tr>'+
            '                               <td class="servico" colspan="8">SERVIÇO - VALOR NACIONAL - R$</td>'+
            '                           </tr>'+
            '                           <tr>'+
            '                               <td>1</td>'+     	
            '                               <td>1</td>'+     	
            '                               <td>BRSV01</td>'+     	
            '                               <td>Manutenção de equipamento</td>'+     	
            '                               <td>' + orcamento.rows[0].valor + '</td>'+     	
            '                               <td>' + orcamento.rows[0].valor + '</td>'+     	
            '                               <td>' + orcamento.rows[0].desconto + '%</td>'+     	
            '                               <td>' + valLiq + '</td>'+     	
            '                           </tr>'+
            '                       </tbody>'+
            '                       <tfoot>'+
            '                           <tr class="resumo font-weight-bold">'+
            '                               <td></td>'+
            '                               <td></td>'+
            '                               <td>Valor total R$</td>'+
            '                               <td></td>'+
            '                               <td></td>'+
            '                               <td>' + orcamento.rows[0].valor + '</td>'+
            '                               <td>' + descontoVal + '</td>'+
            '                               <td>' + valLiq + '</td>'+
            '                           </tr>'+
            '                       </tfoot>'+
            '                   </table>'+
            '               </div>'+
            '           </div>'+
            '           <div class="h-10">'+
            '               <div class="left">'+
            '                   <ul class="list-unstyled">'+
            '                       <li class="font-weight-bold">Condições Gerais:</li>'+
            '                       <li>Validade da proposta: 30 dias.</li>'+
            '                       <li>Pagamento: 28 ddl</li>'+
            '                       <li>Preço com frete CIF incluso</li>'+
            '                       <li>Todos os impostos inclusos</li>'+
            '                       <li>Prazo de Entrega: 10 dias apos a chegada das peças</li>'+
            '                       <li></li>'+
            '                       <li>Atenciosamente,</li>'+
            '                   </ul>'+
            '               </div>'+
            '               <div class="right font-weight-bold text-primary">'+
            '                   <ul class="list-unstyled">'+
            '                       <li>Valor Total Nacional - R$ ' + orcamento.rows[0].valor + '</li>'+
            '                       <li>Desconto Especial - R$ ' + descontoVal + '</li>'+
            '                       <li>Valor Total Liquido - R$ ' + valLiq + '</li>'+
            '                   </ul>'+
            '               </div>'+
            '           </div>'+
            '           <div class="h-10">'+
            '               <div class="left">'+
            '                   <ul class="list-unstyled">'+
            '                       <li>___________________________________________________________________________________</li>'+
            '                       <li>' + orcamento.rows[0].nomeaprov + '</li>'+
            '                       <li>Professional Solutions Brasil | ' + orcamento.rows[0].cargo + '</li>'+
            '                       <li>Ph. ' + orcamento.rows[0].telefone + '</li>'+
            '                   </ul>'+
            '               </div>'+
            '               <div class="right">'+
            '                   <ul class="list-unstyled">'+
            '                       <li>___________________________________________________________________________________</li>'+
            '                       <li>' + orcamento.rows[0].nomecompleto + '</li>'+
            '                       <li>' + orcamento.rows[0].departamento + '</li>'+
            '                       <li>DATA: ' + date.format(new Date(), 'DD/MM/YYYY') + '</li>'+
            '                   </ul>'+
            '               </div>'+
            '           </div>'+
            '       </div>'+
            '   </body>'+
            '</html>';
/*
            require('fs').writeFile('./app/public/pdf.html', html, (err) => {
                if (err) throw err;
                //console.log('The file has been saved!');
            });
*/
            pdf.create(html, options).toFile(file, function(err, res) {

                if (err) reject(err);
                else {
                    console.log(res);
                    resolve(res.filename)
                }
            });
        })        
    })
}