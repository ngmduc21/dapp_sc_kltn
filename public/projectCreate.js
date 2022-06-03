$(document).ready(function(){
    $("#leader").click(function(){
        $.post("./project/searchEmployee",{
            name:$("#leader").val(),
        }, function(data){
            if(data.result == 1){
                $("#leaderEmail").val(data.message._id)
            }else{
                $.alert(data.message)
            }
        })
    })

    var counter = 0

    $("#numberOfMember").click(function(){

        if(counter != 0){
            for(var i=1; i<= counter; i++){
                var div = "div" + i
                var element = document.getElementById(div)
                element.remove()
            }
        }
        counter = $("#numberOfMember").val()

        for(var i=1; i <= counter; i++){
            var newInput = $(document.createElement('div')).attr("class", 'form-floating mb-3').attr("id", 'div' + i);
            
            newInput.after().html('<input type="text" class="form-control" placeholder="example" aria-describedby="clientHelp" id="mem' + i + '" value="">' + 
                '<label for="mem' + i + '" class="form-label">Tên thành viên ' + i + ' </label>' +
                '<div id="mem' + i + 'Help" class="form-text">Cung cấp tên thành viên ' + i + ' của dự án </div>'); 

            newInput.appendTo("#numberMemberList")
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