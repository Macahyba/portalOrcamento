module.exports.montaUser = function(app, user){

    let answ =
    '<tr id="tr' + user.id + '">'+
    '<td>'+user.login+'</td>'+
    '<td>'+user.nome+'</td>'+
    '<td>'+user.email+'</td>'+
    '<td>'+user.perfil+'</td>'+
    '</tr>'

    return answ;
}