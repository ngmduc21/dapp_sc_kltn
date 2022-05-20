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

    $("#numberOfMember").click(function(){
        var mem = $("#numberOfMember").val()
        console.log(mem)
        for (var i=1; i < mem; i++){
            $("#tbMember").append(`
                <tr>
                    <td>
                        <select id="mem`+i+`" class="form-select" aria-describedby="leaderHelp">
                        <% if(data.length){ for(var i=0; i< data.length; i++) {%>
                        <option>
                            <%= data[i].name%>
                        </option>
                        <% }} %>
                    </select>
                    </td>
                </tr>
            `)
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