$(document).ready(function(){

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
                    $.alert(data.message)
                }
            })
        }else{
            $("#mem3ID").val("ID")
        }
    })

    

    var checked = 0

    $("#btnCheck").click(function(){
        if(counter){
            for(var i=1; i<= counter; i++){
                var mem = "mem" + i
                var element = document.getElementById(mem)
                console.log(element)

                $.post("./project/searchEmployee", {
                    name: $(element).val()
                }, function(data){
                    if(data.result == 1){
                        $.alert('Tìm thấy thành viên trên hệ thống!')
                        checked = 1   
                        console.log(checked)                     
                    }
                    else{
                        $.alert('Không tồn tại thành viên trên hệ thống!')
                        console.log(checked) 
                    }
                })
            }
        }
        console.log(checked)
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
                    if(checked == 1){
                        $.post("./project/create", {
                            name:$("#inputName").val(),
                            client:$("#inputClient").val(),
                            leader:$("#leader").val(),
                            budget:$("#inputBudget").val(),
                            numberOfMembers:$("#numberOfMember").val(),
                        }, function(data){
                            if(data.result == 1){
                                $.alert('Thao tác thành công! Trở lại sau 3 giây.')
                                setTimeout(
                                    function() 
                                    {
                                        window.location = "/project/list"
                                    }, 3000);             
                            }
                            else{
                                $.alert('Thao tác thất bại')
                            }
                        })  
                    }else{
                        $.alert("Chưa kiểm tra thành viên")
                    }
                      
                }
            },
            
            Huỷ: function () {
                $.alert('Huỷ bỏ thao tác!');
            },
        }
    });
})