$(document).ready(function(){
    $("#leader").click(function(){
        $.post("./project/searchLeader",{
            name:$("#leader").val(),
        }, function(data){
            if(data.result == 1){
                $("#leaderEmail").val(data.message.email)
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
            
            newInput.after().html('<input type="text" class="form-control" placeholder="example" aria-describedby="clientHelp" id="mem' + counter + '" value="">' + 
                '<label for="mem' + i + '" class="form-label">Tên thành viên ' + i + ' </label>' +
                '<div id="mem' + i + 'Help" class="form-text">Cung cấp tên thành viên ' + i + ' của dự án </div>'); 

            newInput.appendTo("#numberMemberList")
        }
    })

    if(counter != 0){
        for(var i=1; i <= counter; i++){
            var div = "div" +i
            var divelement = document.getElementById(div)
            var mem = "mem" + i
            var element = document.getElementById(mem)
            $(element).click(function(){
                $.alert("Click")
                $.post("./project/searchLeader",{
                    name:$(element).val(),
                }, function(){
                    var result = $(document.createElement('div')).attr("id", 'result')
                    if(data.result == 1){
                        result.after().html('<text> Chính xác </text>')
                        result.appendTo(divelement)
                    }else{
                        result.after().html('<text> Không tìm thấy </text>')
                        result.appendTo(divelement)
                    }
                })
            })
        }
    }

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