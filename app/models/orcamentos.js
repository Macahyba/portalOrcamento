module.exports.montaOrc = function(app, orcamento){

    let moment = require('moment');
    let answ = 
    '<tr id="tr'+orcamento.id+'">'+
    '<td><a href="/detalhe/orcDetalhe/'+orcamento.id+'">'+orcamento.id+'</a></td>'+
    '<td><a href="/detalhe/clienteDetalhe/'+orcamento.idCliente+'">'+orcamento.nomeCliente+'</a></td>'+
    '<td>'+orcamento.nomeEquip+'</td>'+
    '<td>'+orcamento.serialNumber+'</td>'+
    '<td>R$ '+orcamento.valor+'</td>'+
    '<td><a href="/detalhe/userDetalhe/'+orcamento.idUsuario+'">'+orcamento.nomeUsuario+'</a></td>';

    if (app.locals.user.perfil == 'manager') {

        // <form id="'+orcamento.id +'" action="/approve" method="post" > IS OPTIONAL - JQUERY HANDLES IT
        answ += '<td><select name="status">'

        switch (orcamento.status){

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

        answ+= '</select><input type="hidden" name="id" value="'+orcamento.id+'"></td>'

    } else { 

        answ+= '<td>'+orcamento.status+'</td>'

    }
    
    answ+= '<td>' + moment(orcamento.dataCriacao).format( "ddd DD/MM/YYYY HH:mm:ss") + '</td>'

    if (app.locals.user.perfil == 'manager') {							

        answ+= '<td><input type="button" id="sub'+ orcamento.id+'" value="Submit"></td>'
        answ+= '<td><input type="button" id="dow'+ orcamento.id+'" value="Download"></td>'
        // </form> IS OPTIONAL - JQUERY HANDLES IT
    }	

    answ+='</tr>'

    return answ;

}