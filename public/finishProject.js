
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
    $("#wallet1").hide()
    $("#wallet2").hide()
    $("#wallet3").hide()

    var reward = [$("#reward1").val(), $("#reward2").val(), $("#reward3").val()]

    // Khai báo abi và địa chỉ của SC trên Network
    const abi = [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "Approval",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "previousOwner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "receiver",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "transfer",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "receiver",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "receiver",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "allowances",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "balances",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "decimal",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getOwner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "totalSupply",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
    const scAddress = "0x92F51ffcBc7eBB07e4F1aa0a0a362aE958f39b00"
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
    
    var count=[]
    // Bắt event mới nhất từ SC thông qua Infura
    infura_contract.events.Transfer({filter:{}, fromBlock:"latest"}, function(error, event){ 
        if(error){
            console.log(error);
        }else{
            console.log(event);
            count.push(event.blockNumber)
            console.log(count.length)
            if(count.length == 3){
                $("#loading").hide()
                alert('Hoàn thành thành công dự án ' + proj + '! Chuyển hướng sau 3 giây.')
                setTimeout(
                    function() 
                    {
                        window.location = "/project/list"
                    }, 3000); 
            }       
            // $("#tbList").append(`
            //     <tr id="rowLabel">
            //         <td>`+ event.returnValues[0] +`</td>
            //         <td>`+ event.returnValues[1] +`</td>
            //     </tr>`);
        }
    })
    
    var userAccount = "";
    var memWallet = []

    isMetamaskInstalled();

    $("#btnConnectMM").click(function(){
        $("#loading").show()
        setTimeout(function(){
            connectMM().then((data)=>{
                userAccount = data[0];
                console.log(userAccount);
            }).catch((err) => {
                console.log(err);
            });
            $.post("/project/wallet", {
                mem1: $("#mem1").val(),
                mem2: $("#mem2").val(),
                mem3: $("#mem3").val(),
            }, function(data){
                if(data.result==1){
                    $("#loading").hide()
                    memWallet = data.wallet
                    console.log(memWallet, reward)
                    alert("Kết nối thành công ví " +userAccount+" với hệ thống!")
                }
            })
        })
        
    });
    var proj = ""
    $("#btnFinish").confirm({
        title: 'Xác nhận',
        content: 'Bạn chắc chắn muốn hoàn thành dự án này ?',
        buttons: {
            delete: {
                text: 'Xác nhận',
                btnClass: 'btn-blue',
                keys: ['enter', 'shift'],
                action: function(){
                    if(userAccount.length == 0){
                        alert("Please login MetaMask!");
                    }else{
                        $("#loading").show()
                        setTimeout(function(){
                            $.post("./project/finish", {
                                project: $("#projectID").val(),
                            },function(data){
                                if(data.result == 1){
                                    proj = data.message
                                    contractMM.methods.transfer(userAccount, memWallet[0], reward[0]).send({
                                        from: userAccount
                                    })
                                    contractMM.methods.transfer(userAccount, memWallet[1], reward[1]).send({
                                        from: userAccount
                                    })
                                    contractMM.methods.transfer(userAccount, memWallet[2], reward[2]).send({
                                        from: userAccount
                                    })
                                           
                                }
                                else{
                                    $("#loading").hide()
                                    alert('Thao tác thất bại')
                                }
                            })    
                        }, 1000)
                    }
                }
            },
            
            Huỷ: function () {
                $.alert('Huỷ bỏ thao tác!');
            },
        }
    });
})

