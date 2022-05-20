$(document).ready(function(){
    $("#btnDelete").confirm({
        title: 'Xác nhận',
        content: 'Bạn chắc chắn muốn xoá nhân viên này ?',
        buttons: {
            delete: {
                text: 'Xoá dự án',
                btnClass: 'btn-blue',
                keys: ['enter', 'shift'],
                action: function(){
                    $.post("./users/delete", {
                        id:$("#employeeID").val()
                    }, function(data){
                        if(data.result == 1){
                            $.alert('Thao tác thành công! Trở lại sau 3 giây.')
                            setTimeout(
                                function() 
                                {
                                    window.location = "/users/list"
                                }, 5000);
                        }
                        else{
                            $.alert('Thao tác thất bại')
                        }
                    })
                    
                }
            },
            
            Huỷ: function () {
                $.alert('Huỷ bỏ thao tác!');
            },
        }
    });
   
})