module.exports.montaOrc = function(app, orcamento){

    let moment = require('moment');
    let answ = 
    '<tr id="tr'+orcamento.id+'">'+
    '<td><a href="/detalhe/orcDetalhe/'+orcamento.id+'">'+orcamento.id+'</a></td>'+
    '<td><a href="/detalhe/clienteDetalhe/'+orcamento.idcliente+'">'+orcamento.nomecliente+'</a></td>'+
    '<td>'+orcamento.nomeequip+'</td>'+
    '<td>'+orcamento.serialnumber+'</td>'+
    '<td>R$ '+orcamento.valor+'</td>'+
    '<td><a href="/detalhe/userDetalhe/'+orcamento.idusuario+'">'+orcamento.login+'</a></td>';

    if (app.locals.user.perfil !== 'usuario') {

        // <form id="'+orcamento.id +'" action="/approve" method="post" > IS OPTIONAL - JQUERY HANDLES IT
        answ += '<td><select name="status">'

        switch (orcamento.status){

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

            default:

                answ+= '<option value="NOVO" selected="selected">NOVO</option>'
                answ+= '<option value="APROVADO">APROVADO</option>'
                answ+= '<option value="REJEITADO">REJEITADO</option>'
        }

        answ+= '</select><input type="hidden" name="id" value="'+orcamento.id+'"></td>'

    } else { 

        answ+= '<td>'+orcamento.status+'</td>'

    }
    
    answ+= '<td>' + moment(orcamento.datacriacao).format( "ddd DD/MM/YYYY HH:mm:ss") + '</td>'

    if (app.locals.user.perfil !== 'usuario') {							

        answ+= '<td><input type="button" id="sub'+ orcamento.id+'" value="Submit"></td>'
        
        if(orcamento.status == "APROVADO") {

            answ+= '<td><input type="button" id="dow'+ orcamento.id+'" value="Download"></td>'
        }
        
        // </form> IS OPTIONAL - JQUERY HANDLES IT
    }	

    answ+='</tr>'

    return answ;

}