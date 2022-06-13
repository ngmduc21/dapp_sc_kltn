
function isMetamaskInstalled(){
    if (typeof window.ethereum !== 'undefined') {
        console.log('OK. MetaMask is installed!');
    }
    else{
        console.log("Attention: MetaMask is uninstalled!")
    }
}

async function connectMM(){
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    return accounts;
}

$(document).ready(function(){
    $("#loading").hide()
    $("#projectID").hide()
    $("#mem1").hide()
    $("#mem2").hide()
    $("#mem3").hide()
    $("#reward1").hide()
    $("#reward2").hide()
    $("#reward3").hide()
    // Khai báo abi và địa chỉ của SC trên Network
  

    $("#btnFinish").confirm({
        title: 'Xác nhận',
        content: 'Bạn chắc chắn muốn hoàn thành dự án này ?',
        buttons: {
            delete: {
                text: 'Xác nhận',
                btnClass: 'btn-blue',
                keys: ['enter', 'shift'],
                action: function(){
                    // if(userAccount.length == 0){
                    //     alert("Please login MetaMask!");
                    // }else{
                        $("#loading").show()
                        setTimeout(function(){
                            $.post("./project/finish", {
                                project: $("#projectID").val(),
                                mem1: $("#mem1").val(),
                                mem2: $("#mem1").val(),
                                mem3: $("#mem1").val(),
                                reward1: $("#reward1").val(),
                                reward2: $("#reward1").val(),
                                reward3: $("#reward1").val(),
                            },function(data){
                                if(data.result == 1){
                                    $("#loading").hide()
                                    $.alert('Hoàn thành thành công dự án ' + data.message + '! Chuyển hướng sau 3 giây.')
                                    setTimeout(
                                        function() 
                                        {
                                            window.location = "/project/list"
                                        }, 3000);             
                                }
                                else{
                                    $("#loading").hide()
                                    $.alert('Thao tác thất bại')
                                }
                            })    
                        }, 1000)
                    //}
                }
            },
            
            Huỷ: function () {
                $.alert('Huỷ bỏ thao tác!');
            },
        }
    });
})

