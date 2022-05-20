$(document).ready(function(){
    var number = $("number")
    console.log(number)
        $("#mem").click(function(){
            $.post("./project/searchLeader",{
                name:$("#mem").val(),
            }, function(data){
                if(data.result == 1){
                    $("#memEmail").val(data.message.email)
                }else{
                    $.alert(data.message)
                }
            })
        })
    
    
})
