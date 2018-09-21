module.exports.aprova = function(app, req, res) {

    let moment = require('moment');
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
        let answ = 


        '<tr id="tr'+query[0].id+'">'+
        '<td><a href="/detalhe/orcDetalhe/'+query[0].id+'">'+query[0].id+'</a></td>'+
        '<td><a href="/detalhe/clienteDetalhe/'+query[0].idCliente+'">'+query[0].nomeCliente+'</a></td>'+
        '<td>'+query[0].nomeEquip+'</td>'+
        '<td>'+query[0].serialNumber+'</td>'+
        '<td>R$ '+query[0].valor+'</td>'+
        '<td><a href="/detalhe/userDetalhe/'+query[0].idUsuario+'">'+query[0].nomeUsuario+'</a></td>';

        if (app.locals.user.perfil == 'manager') {

            answ += '<form id="'+query[0].id +'" action="/approve" method="post" ><td><select name="status">'

            switch (query[0].status){

                case "NOVO":

                    answ+= '<option value="NOVO" selected="selected">NOVO</option>'
                    answ+= '<option value="APROVADO">APROVADO</option>'
                    answ+= '<option value="REJEITADO">REJEITADO</option>'
                    break;
                case "APROVADO":

                    answ+= '<option value="NOVO">NOVO</option>'
                    answ+= '<option value="APROVADO" selected="selected">APROVADO</option>'
                    answ+= '<option value="REJEITADO">REJEITADO</option>'
                    break;
                case "REJEITADO":

                    answ+= '<option value="NOVO">NOVO</option>'
                    answ+= '<option value="APROVADO">APROVADO</option>'
                    answ+= '<option value="REJEITADO" selected="selected">REJEITADO</option>'
                    break;  
            }

            answ+= '</select><input type="hidden" name="id" value="'+query[0].id+'"></td>'

        } else { 

            answ+= '<td>'+query[0].status+'</td>'

        }
        
        answ+= '<td>' + moment(query[0].dataCriacao).format( "ddd DD/MM/YYYY HH:mm:ss") + '</td>'

        if (app.locals.user.perfil == 'manager') {							

            answ+= '<td><input type="button" id="sub'+ query[0].id+'" value="Submit"></td></form>'
        }	

        answ+='</tr>'


        
/*
        $('tbody').append($('<tr></tr>').attr('id', 'tr'+query[0].id));
        $('#tr'+query[0].id).append('<td><a href="/detalhe/orcdetalhe/'+query[0].id+'">'+query[0].id+'</a></td>');
        $('#tr'+query[0].id).append('<td><a href="/detalhe/clientedetalhe/'+query[0].idCliente+'">'+query[0].nomeCliente+'</a></td>')
        $('#tr'+query[0].id).append('<td>'+ query[0].nomeEquip+'</td>')
        $('#tr'+query[0].id).append('<td>'+ query[0].serialNumber+'</td>')
        $('#tr'+query[0].id).append('<td>'+ query[0].valor+'</td>')
        $('#tr'+query[0].id).append('<td><a href="/detalhe/userdetalhe/'+query[0].idUsuario+'">'+query[0].nomeUsuario+'</a></td>')

        let perfil = 'manager';
        if (perfil == 'manager'){

            $('#tr'+query[0].id).append('<form id="'+query[0].id+'" action="/approve" method="post" ></form>')
            $('#tr'+query[0].id).append('<td>')
            $('#tr'+query[0].id).append('<select id="s'+query[0].id+'" name="status">')

            switch (query[0].status){

                case "NOVO":
                    $('#s'+query[0].id).append('<option value="NOVO" selected="selected">NOVO</option>')
                    $('#s'+query[0].id).append('<option value="APROVADO">APROVADO</option>')
                    $('#s'+query[0].id).append('<option value="REJEITADO">REJEITADO</option>')
                    break;
                case "APROVADO":
                    $('#s'+query[0].id).append('<option value="NOVO">NOVO</option>')
                    $('#s'+query[0].id).append('<option value="APROVADO" selected="selected">APROVADO</option>')
                    $('#s'+query[0].id).append('<option value="REJEITADO">REJEITADO</option>')
                    break;
                case "REJEITADO":
                    $('#s'+query[0].id).append('<option value="NOVO">NOVO</option>')
                    $('#s'+query[0].id).append('<option value="APROVADO">APROVADO</option>')
                    $('#s'+query[0].id).append('<option value="REJEITADO" selected="selected">REJEITADO</option>')
                    break;
            }

            $('#tr'+query[0].id).append('</select>')
            $('#tr'+query[0].id).append('<input type="hidden" name="id" value="'+query[0].id+'">')
            $('#tr'+query[0].id).append('</td>')

        } else {

            $('#tr'+query[0].id).append('<td>'+query[0].status+'</td>')
        }

        //$('#tr'+query[0].id).append('<td>'+moment(query[0].dataCriacao).format("ddd DD/MM/YYYY HH:mm:ss")+'</td>')
        $('#tr'+query[0].id).append('<td>'+query[0].dataCriacao+'</td>')

        if (perfil == 'manager'){

            $('#tr'+query[0].id).append('<td><button id="b'+query[0].id+'" onclick="updateRow('+query[0].id+')">Submit</button></td>')
        }

        $('#tr'+query[0].id).append('</form>')
        $('#tr'+query[0].id).append('</tr>')

*/




        //console.log(answ);
        // DON'T NEED TO SEND, AJAX FETCHES THE RETURN VALUE
        res.send(answ);
    })

    /*.catch(function(err){
        
        //console.log(err);
        res.status(500).render("erro", { error : err});
    })*/

    .finally(function(){

        if (conn) { conn.end(); }
    })
}