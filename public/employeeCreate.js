
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

    // Khai báo abi và địa chỉ của SC trên Network
    const abi = [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "_employeeWallet",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "_id",
                    "type": "string"
                }
            ],
            "name": "CreateNewEmployee",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_id",
                    "type": "string"
                }
            ],
            "name": "Register",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "arrEmployee",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "_id",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "_employeeWallet",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];
    const scAddress = "0x7c5104220acB7Eeb68b228e89060acD430F9AA0b";

    // Khởi tạo biến web3
    const web3 = new Web3(window.ethereum);
    window.ethereum.enable();

    // Kết nối đến SC và sử dụng ví MetaMask làm địa chỉ gọi SC
    var contractMM = new web3.eth.Contract(abi, scAddress);
    console.log(contractMM);

    // Khởi tạo Web Socket kết nối với Infura để bắt các event từ SC emit ra
    var provider = new Web3.providers.WebsocketProvider("wss://rinkeby.infura.io/ws/v3/ebad9413b5c04f5a9f7eb4768b7237ed");
    var infura_web3 = new Web3(provider);
    var infura_contract = infura_web3.eth.Contract(abi, scAddress);
    console.log(infura_contract);
    
    // Bắt event mới nhất từ SC thông qua Infura
    infura_contract.events.CreateNewEmployee({filter:{}, fromBlock:"latest"}, function(err, event){ 
        if(err){
            console.log(err);
        }else{
            console.log(event); 
            $("#tbList").append(`
                <tr id="rowLabel">
                    <td>`+ event.returnValues[0] +`</td>
                    <td>`+ event.returnValues[1] +`</td>
                </tr>`);
        }
    })

    var userAccount = "";

    isMetamaskInstalled();

    $("#btnConnectMM").click(function(){
        connectMM().then((data)=>{
            userAccount = data[0];
            console.log(userAccount);
        }).catch((err) => {
            console.log(err);
        });
    });
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
                            //contractMM.methods.Register(data.message._id).send({//from: userAccount})
                            $.alert("Thao tác thành công! Chuyển hướng trong 5 giây.");
                            setTimeout(
                                function() 
                                {
                                    window.location = "/users/list"
                                }, 5000); 
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

