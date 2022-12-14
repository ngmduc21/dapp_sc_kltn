$(document).ready(function(){
    $("#loading").hide()
    $("#member").click(function(){
        if($("#member").val() != "Lựa chọn"){
            $.post("./project/searchEmployee",{
                name:$("#member").val(),
            }, function(data){
                if(data.result == 1){
                    $("#memberID").val(data.message._id) 
                }else{
                    $("#member").val("Lựa chọn")
                    $.alert(data.message)
                }
            })
        }else{
            $("#memberID").val("ID")
        }
    })
    
    $("#btnSubmit").confirm({
        title: 'Xác nhận',
        content: 'Bạn chắc chắn muốn tạo công việc này ?',
        buttons: {
            delete: {
                text: 'Xác nhận',
                btnClass: 'btn-blue',
                keys: ['enter', 'shift'],
                action: function(){
                    if($("#point").val() > 500){
                        $.alert("Điểm thường không thể quá 500!")
                        $("#point").val("")
                    }else if($("#member").val() == "Lựa chọn"){
                        $.alert("Chưa có thành viên được gán cho task này!")
                    }
                    else{
                        $("#loading").show()
                        setTimeout(function(){
                            $.post("./project/createTask", {
                                project: $("#id").val(),
                                name: $("#name").val(),
                                point: $("#point").val(),
                                member: $("#memberID").val(),
                                memName: $("#member").val()
                            },function(data){
                                if(data.result == 1){
                                    $("#loading").hide()
                                    $.alert('Khởi tạo thành công công việc "' + data.message + '"! Chuyển hướng sau 3 giây.')
                                    setTimeout(
                                        function() 
                                        {
                                            window.location = "/project/" + $("#id").val()
                                        }, 3000);             
                                }
                                else{
                                    $("#loading").hide()
                                    $.alert('Thao tác thất bại! ' + data.message)
                                }
                            })    
                        }, 1000)
                    }
                }
            },
            
            Huỷ: function () {
                $.alert('Huỷ bỏ thao tác!');
            },
        }
    });
})