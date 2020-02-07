
$(document).ready(function(){
    $(".btn-std").click(function(){
        if( $(this).hasClass("disabled") ){
            return false;
        }
    });
    //validacion formulario
    var tarjetaSelect = false;
    var emailInput = false;
    var teleInput = false;
    var dirInput = false;
    var ofDepIn = false;
    var regionSelect = false;
    var comCamSel = false;
    var declaro = false;
    $(".select.select--style li").click(function(){
        var idSelect = $(this).parent().parent().find("select").attr("id");
        if(idSelect == "tarjeta-cam"){
            tarjetaSelect = true;
            valPulsera();
            $(".despliegue-tarjeta").slideDown();
        }else if( idSelect == "region-cam"){
            regionSelect = true;
            valPulsera();
        }else if( idSelect == "com-cam" ){
            comCamSel = true;
            valPulsera();
        }
    });
    $("#email-cam").focusout(function(){
        if( $(this).hasClass("valid") ){
            emailInput = true;
            valPulsera();
        }else{
            emailInput = false;
            valPulsera();
        }
    });
    $("#tel-cam").focusout(function(){
        if( $(this).hasClass("valid") ){
            teleInput = true;
            valPulsera();
        }else{
            teleInput = false;
            valPulsera();
        }
    });
    $("#dir-cam").focusout(function(){
        if( $(this).val() ){
            dirInput = true;
            valPulsera();
        }else{
            dirInput = false;
            valPulsera();
        }
    });
    $("#ofDep").focusout(function(){
        if( $(this).val() ){
            ofDepIn = true;
            valPulsera();
        }else{
            ofDepIn = false;
            valPulsera();
        }
    });
    $("#declaro-cam").click(function(){
        if( $(this).prop("checked") == true ){
            declaro = true;
            valPulsera();
        }else{
            declaro = false;
            valPulsera();
        }
    })
    function valPulsera(){
        if(tarjetaSelect && emailInput && teleInput && dirInput && ofDepIn && regionSelect && comCamSel && declaro){
            $(".error-check-cam").hide();
            $("#btnFormCam").removeClass("disabled");
        }else{
            $("#btnFormCam").addClass("disabled");
        }
    };
    $("#btnFormCam").click(function(){
        if(tarjetaSelect && emailInput && teleInput && dirInput && ofDepIn && regionSelect && comCamSel && !declaro){
            $(".error-check-cam").css("display", "block");
        }else{
            $(".error-check-cam").hide();
        }
    });
});