$(function(){

    //console.log(JSON.stringify(data,null,4))
    for (var i=0; i < data.cliente.length; i++) {
       // <option value="<%= montaData.cliente[i].nomeCliente %>">
       $('#nomeList').append("<option value='" + data.cliente[i].nomeCliente + "'")

    }

    for (var i=0; i < data.equip.length; i++) {

       $('#equipList').append("<option value='" + data.equip[i].nomeEquip + "'")

    }

    var full;
    $("#nomeCliente").blur(function(){

        let nomeCliente= $("#nomeCliente").val(); 
        //let idCliente = $("#nomeList").find('option[value="' + nomeCliente + '"]').attr('id');
        

        if (!nomeCliente) { 
            limpaCliente();
            return;
        };

        fetch("/formFill/cnpj/" + nomeCliente)

        .then(function(res){

            return res.json()
        })

        .then(function(res){

            cnpj.value = res[0].cnpj;
            cnpj.readOnly = true;
            responsavel.value = res[0].responsavel
            $('#respList option').remove();
            for (i=0; i< res.length; i++){
                $('#respList').append("<option value='" + res[i].responsavel + "'")
            }
            departamento.value = res[0].departamento;

            full = res;
            
            return full;
            
        })

        .catch(function() {

            limpaCliente();

        })

    });


    $("#nomeEquip").blur(function(){

        let nomeEquip= $("#nomeEquip").val();      

        if (!nomeEquip) { 
            limpaEquip();
            return;
        };

        fetch("/formFill/serialNumber/" + nomeEquip)

        .then(function(res){

            return res.json()
        })

        .then(function(res){

            $('#serialList option').remove();
            for (i=0; i< res.length; i++){
                $('#serialList').append("<option value='" + res[i].serialNumber + "'")
            }
            full = res;
            
            return full;
            
        })

        .catch(function() {

            limpaEquip();

        })

    });

})

function limpaCliente(){

    cnpj.value = "";
    cnpj.readOnly = false;
    responsavel.value = "";
    $('#respList option').remove();
    departamento.value = "";

}

function limpaEquip(){

    nomeEquip.value = "";
    serialNumber.value = "";
    $('#serialList option').remove();

}