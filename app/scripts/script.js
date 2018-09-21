$(function(){

    $(document).ready(function(){
        $('body').on('click','input[type="button"]', (function(){
            
            let id = $(this).attr('id').slice(3);
            let op = $(this).attr('id').slice(0, 3);
            let formData= $('#tr'+id+' :input').serializeArray();
            //$('#' + op + id).prop('disabled', true); // AVOID MULTIPLE SUBMITS
            event.preventDefault();

            switch (op){ 

                case "sub":
                    
                    $.ajax({
                        method: "post",
                        url: "/approve",
                        data: formData
                    })
                    .done(function( msg ) {
        
                        $('#tr' + id).replaceWith(msg);
                        alert("Orcamento: " + id + " atualizado com sucesso!")
                    })
        
                    .fail(function(err){
        
                        alert("Ocorreu um erro, favor tente novamente")
                        $('#sub' + id).prop('disabled', false);
                        console.log(now()+JSON.stringify(err,null,4))
                    })
                    break;

                case "dow":

                    $.ajax({
                        method: "post",
                        url: "/download",
                        data: formData
                    })
                    .done(function() {
                        
                        //console.log(msg)
                        //$('#tr' + id).replaceWith(msg);
                        alert("Download vai começar")
                        window.open('pdf/'+id+'.pdf','_blank')
                    })
        
                    .fail(function(err){
        
                        alert("Ocorreu um erro, favor tente novamente")
                        $('#dow' + id).prop('disabled', false);
                        console.log(Date.now()+JSON.stringify(err,null,4))
                    })
                    break;
            }
            
        }))
    })

    $('input').on('input', function(){

        $(this).next().removeClass('errorShow').addClass("error");
        $(this).removeClass('invalid').addClass("valid");
    })

    if (typeof(data) !== 'undefined') {
        if (('cliente' in data)){
            //console.log(JSON.stringify(data,null,4))
            for (var i=0; i < data.cliente.length; i++) {
                // <option value="<%= montaData.cliente[i].nomeCliente %>">
                $('#nomeList').append("<option value='" + data.cliente[i].nomeCliente + "'")

            }
        }

        if (('equip' in data)){
            for (var i=0; i < data.equip.length; i++) {

                $('#equipList').append("<option value='" + data.equip[i].nomeEquip + "'")

            }
        }
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

    $('input').keypress(function(e) {
        if(e.which == 13) {
            sendForm();
        }
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

function sendForm(){

    let formData = $('#form').serializeArray();
    let errorFree = true;

    for (let input in formData){
        
        if (!$('input[name='+formData[input].name+']').val()){
            $('input[name='+formData[input].name+']').next().removeClass('error').addClass("errorShow");
            $('input[name='+formData[input].name+']').removeClass('valid').addClass("invalid");
            errorFree = false;
        };
    }

    if (errorFree){
        
        $("#send").prop('disabled', true);
        $("#form").submit();
    }
}

function updateRow(data) {
    alert(data)
    $('#b'+data).prop('disabled', true);
    //document.getElementById(data).submit();
    $.post("/approve", {
        status: "APROVADO",
        id: data
    },
    (dataa, statuss)=>{
        $('#tr'+data).load();
        console.log("Data: " + dataa + "\nStatus: " + statuss);
    });
}