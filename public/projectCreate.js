$(document).ready(function(){
    $("#loading").hide()
    $("#leader").click(function(){
        if($("#leader").val() != "Lựa chọn"){
            $.post("./project/searchEmployee",{
                name:$("#leader").val(),
            }, function(data){
                if(data.result == 1){
                    if(data.message._id == $("#mem1ID").val() &&  data.message._id != "ID" ||
                       data.message._id == $("#mem2ID").val() &&  data.message._id != "ID" || 
                       data.message._id == $("#mem3ID").val() &&  data.message._id != "ID" ){

                        $.alert("This employee have been chosen!")
                        $("#leader").val("Lựa chọn")
                        $("#leaderID").val("ID")
                    }else{
                        $("#leaderID").val(data.message._id)
                    }
                }else{
                    $("#leader").val("Lựa chọn")
                    $.alert(data.message)
                }
            })
        }else{
            $("#leaderID").val("ID")
        }
    })

    $("#mem1").click(function(){
        if($("#mem1").val() != "Lựa chọn"){
            $.post("./project/searchEmployee",{
                name:$("#mem1").val(),
            }, function(data){
                if(data.result == 1){
                    if(data.message._id == $("#leaderID").val() &&  data.message._id != "ID" ||
                       data.message._id == $("#mem2ID").val() &&  data.message._id != "ID" || 
                       data.message._id == $("#mem3ID").val() &&  data.message._id != "ID" ){

                        $.alert("This employee have been chosen!")
                        $("#mem1").val("Lựa chọn")
                        $("#mem1ID").val("ID")
                    }else{
                        $("#mem1ID").val(data.message._id)
                    }
                }else{
                    $("#mem1").val("Lựa chọn")
                    $.alert(data.message)
                }
            })
        }else{
            $("#mem1ID").val("ID")
        }
    })

    $("#mem2").click(function(){
        if($("#mem2").val() != "Lựa chọn"){
            $.post("./project/searchEmployee",{
                name:$("#mem2").val(),
            }, function(data){
                if(data.result == 1){
                    if(data.message._id == $("#leaderID").val() &&  data.message._id != "ID" ||
                       data.message._id == $("#mem1ID").val() &&  data.message._id != "ID" || 
                       data.message._id == $("#mem3ID").val() &&  data.message._id != "ID" ){

                        $.alert("This employee have been chosen!")
                        $("#mem2").val("Lựa chọn")
                        $("#mem2ID").val("ID")
                    }else{
                        $("#mem2ID").val(data.message._id)
                    }
                }else{
                    $("#mem2").val("Lựa chọn")
                    $.alert(data.message)
                }
            })
        }else{
            $("#mem2ID").val("ID")
        }
    })

    $("#mem3").click(function(){
        if($("#mem3").val() != "Lựa chọn"){
            $.post("./project/searchEmployee",{
                name:$("#mem3").val(),
            }, function(data){
                if(data.result == 1){
                    if(data.message._id == $("#leaderID").val() &&  data.message._id != "ID" ||
                       data.message._id == $("#mem1ID").val() &&  data.message._id != "ID" || 
                       data.message._id == $("#mem2ID").val() &&  data.message._id != "ID" ){

                        $.alert("This employee have been chosen!")
                        $("#mem3").val("Lựa chọn")
                        $("#mem3ID").val("ID")
                    }else{
                        $("#mem3ID").val(data.message._id)
                    }
                }else{
                    $("#mem3").val("Lựa chọn")
                    $.alert(data.message)
                }
            })
        }else{
            $("#mem3ID").val("ID")
        }
    })
    
    $("#btnSubmit").confirm({
        title: 'Xác nhận',
        content: 'Bạn chắc chắn muốn tạo dự án này ?',
        buttons: {
            delete: {
                text: 'Xác nhận',
                btnClass: 'btn-blue',
                keys: ['enter', 'shift'],
                action: function(){
                    
                    $("#loading").show()
                    setTimeout(function(){
                        $.post("./project/create", {
                            name:$("#inputName").val(),
                            client:$("#inputClient").val(),
                            leader:$("#leader").val(),
                            budget:$("#inputBudget").val(),
                            numberOfMembers:"3",
                            lead:$("#leaderID").val(),
                            mem1:$("#mem1ID").val(),
                            mem2:$("#mem2ID").val(),
                            mem3:$("#mem3ID").val(),
                        },function(data){
                            if(data.result == 1){
                                $("#loading").hide()
                                $.alert('Khởi tạo thành công dự án ' + data.message + '! Chuyển hướng sau 3 giây.')
                                setTimeout(
                                    function() 
                                    {
                                        window.location = "/project/list"
                                    }, 3000);             
                            }
                            else{
                                $("#loading").hide()
                                $.alert('Thao tác thất bại')
                            }
                        })    
                    }, 1000)
                    
                }
            },
            
            Huỷ: function () {
                $.alert('Huỷ bỏ thao tác!');
            },
        }
    });
})