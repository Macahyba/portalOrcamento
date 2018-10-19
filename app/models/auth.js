module.exports.montaUser = function(app, user){

    let answ =
    '<div class="col">'+user.login+'</div>'+
    '<div class="col">'+user.nome+'</div>'+
    '<div class="col">'+user.email+'</div>'+
    '<div class="col">'+user.perfil+'</div>'

    return answ;
}