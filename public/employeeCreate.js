

$(document).ready(function(){

    
    $("#btnSubmit").confirm({
        title: 'Xác nhận',
        content: 'Bạn chắc chắn muốn tạo nhân viên này ?',
        buttons: {
            delete: {
                text: 'Xác nhận',
                btnClass: 'btn-blue',
                keys: ['enter', 'shift'],
                action: function(){ 
                    $.post("./users/create", {
                        email:$("#inputEmail").val(),
                        name:$("#inputName").val(),
                        wallet:$("#inputWallet").val(),
                        phone:$("#inputPhone").val(),
                    }, function(data){
                        console.log(data);
                        if(data.result == 1){
                            
                            $.alert("Thao tác thành công! Trở lại sau 3 giây");
                            setTimeout(
                                function() 
                                {
                                    window.location = "/users/list"
                                }, 3000); 
                        }else{
                            $.alert('Thao tác thất bại')
                        }
                    });
                      
                }
            },
            
            Huỷ: function () {
                $.alert('Huỷ bỏ thao tác!');
            },
        }
    });
});

