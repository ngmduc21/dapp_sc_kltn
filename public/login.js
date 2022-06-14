$(document).ready(function(){
    $("#loading").hide()
    $("#btnLogin").click(function(){
        $("#loading").show()
        
        setTimeout(function(){
            $.post("auth/login",{
                email: $("#email").val(),
                passwd: $("#passwd").val()
            }, function(data){
                if(data.result == 1){
                    $("#loading").hide()
                    $.alert('Login ok')
                }else{
                    $("#loading").hide()
                    $.alert(data.message)
                }
            })
        }, 1000)
        
    })
})