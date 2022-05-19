$(document).ready(function(){
    $("#leader").click(function(){
        $.post("./project/searchLeader",{
            name:$("#leader").val(),
        }, function(data){
            if(data.result == 1){
                $("#leaderEmail").val(data.message)
            }else{
                $.alert(data.message)
            }
        })
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
                    $.post("./project/create", {
                        name:$("#inputName").val(),
                        client:$("#inputClient").val(),
                        leader:$("#leader").val(),
                        budget:$("#inputBudget").val(),
                        numberOfMembers:$("#inputNumberofMember").val(),
                    }, function(data){
                        if(data.result == 1){
                            $.alert('Thao tác thành công! Chuyển hướng trong 5 giây.')
                            setTimeout(
                                function() 
                                {
                                    window.location = "/project/list"
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