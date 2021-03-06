module.exports.montaOrc = function(app, orcamento){

    let answ = 
    '<tr id="tr'+orcamento.id+'">'+
    '<td><a href="/detalhe/orcDetalhe/'+orcamento.id+'">'+orcamento.id+'</a></td>'+
    '<td><a href="/detalhe/clienteDetalhe/'+orcamento.idcliente+'">'+orcamento.nomecliente+'</a></td>'+
    '<td>'+orcamento.nomeequip+'</td>'+
    '<td>'+orcamento.serialnumber+'</td>'+
    '<td>R$ '+orcamento.valor*(1-orcamento.desconto/100)+'</td>';

    if (app.locals.user.perfil !== 'usuario') {

        // <form id="'+orcamento.id +'" action="/approve" method="post" > IS OPTIONAL - JQUERY HANDLES IT
        answ += '<td><select class="custom-select custom-select-sm" name="status">'

        switch (orcamento.status){

            case "APROVADO":

                answ+= '<option value="NOVO">NOVO</option>'
                answ+= '<option value="APROVADO" selected>APROVADO</option>'
                answ+= '<option value="REJEITADO">REJEITADO</option>'
                break;
            case "REJEITADO":

                answ+= '<option value="NOVO">NOVO</option>'
                answ+= '<option value="APROVADO">APROVADO</option>'
                answ+= '<option value="REJEITADO" selected>REJEITADO</option>'
                break;  

            default:

                answ+= '<option value="NOVO" selected>NOVO</option>'
                answ+= '<option value="APROVADO">APROVADO</option>'
                answ+= '<option value="REJEITADO">REJEITADO</option>'
        }

        answ+= '</select><input type="hidden" name="id" value="'+orcamento.id+'"></td>'

    } else { 

        answ+= '<td>'+orcamento.status+'</td>'

    }
    
    answ+= '<td>' + orcamento.datacriacao + '</td>'

    if (app.locals.user.perfil !== 'usuario') {							

        answ+= '<td><input class="btn btn-sm btn-success" type="button" id="sub'+ orcamento.id+'" value="Atualizar"></td>'
    } 

    if(orcamento.status == "APROVADO") {

        answ+= '<td><input class="btn btn-sm btn-primary" type="button" id="dow'+ orcamento.id+'" value="Download"></td>'
    } else {
        answ+= '<td></td>';
    }
    
        // </form> IS OPTIONAL - JQUERY HANDLES IT
    	

    answ+='</tr>'

    return answ;

}

module.exports.montaCliente = function(app, orcamento) {

    // TODO

}

module.exports.montaOrcDet = function(app, orcamento) {

    //TODO
}