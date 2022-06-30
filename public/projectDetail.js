$(document).ready(function(){
    $("#loading").hide()

    $("#deleteTask").confirm({
        title: 'Xác nhận',
        content: 'Bạn chắc chắn muốn xoá task này ?',
        buttons: {
            delete: {
                text: 'Xoá công việc',
                btnClass: 'btn-blue',
                keys: ['enter', 'shift'],
                action: function(){
                    $("#loading").show()
                    var task = $("#idTaskDelete").val()
                    var id = document.getElementById(task).value
                    console.log(id)
                    setTimeout(function(){
                        $.post("./project/deleteTask", {
                            task:id
                        }, function(data){
                            if(data.result == 1){
                                $.alert(data.message)
                                setTimeout(
                                    function() 
                                    {
                                        window.location.reload()
                                    }, 1000);
                            }
                            else{
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
    })

    $("#btnDelete").confirm({
        title: 'Xác nhận',
        content: 'Bạn chắc chắn muốn xoá dự án này ?',
        buttons: {
            delete: {
                text: 'Xoá dự án',
                btnClass: 'btn-blue',
                keys: ['enter', 'shift'],
                action: function(){
                    $("#loading").show()
                    setTimeout(function(){
                        $.post("./project/delete", {
                            id:$("#projectID").val()
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
                    }, 1000)
                }
            },
            
            Huỷ: function () {
                $.alert('Huỷ bỏ thao tác!');
            },
        }
    });
   
})