$(document).ready(function(){
    $("#leader").click(function(){
        $.post("./project/searchLeader",{
            name:$("#leader").val(),
        }, function(data){
            if(data.result == 1){
                $("#leaderEmail").val(data.message.email)
                $("#leaderList").val(data.message.name)
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
                    
                }
            },
            
            Huỷ: function () {
                $.alert('Huỷ bỏ thao tác!');
            },
        }
    });
})