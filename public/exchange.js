function isMetamaskInstalled() {
    if (typeof window.ethereum !== 'undefined') {
        console.log('OK. MetaMask is installed!');
    }
    else {
        console.log("Attention: MetaMask is uninstalled!")
    }
}

async function connectMM() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    return accounts;
}

$(document).ready(function () {

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
    const tokensc = "0x3BAF920cDC3DF905c59CdF198BD84E2b1e33C50d"
    const scAddress = "0x92F51ffcBc7eBB07e4F1aa0a0a362aE958f39b00";

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

    var userAccount = "";
    var receiverAccount = "";
    isMetamaskInstalled();

    $("#show").click(function () {
        connectMM().then((data) => {
            userAccount = data[0];
            console.log(userAccount);
            $("#senderWallet").val(userAccount)
            contractMM.methods.balanceOf(userAccount).call({
                from: userAccount
            }).then(function (result) {
                $("#senderAmount").val(result.toString());
            });
        }).catch((err) => {
            console.log(err);
            $("#senderWallet").val(err.message)
        });
    });

    $("#verifyExchange").click(function(){
        $.post("./transfer/searchEmployee",{
            name:$("#receiverID").val(),
        }, function(data){
            if(data.result == 1){
                $("#receiverWallet").val(data.message.walletAddress)
                $("#receiverName").val(data.message.name)
            }else{
                $.alert(data.message)
            }
        })
    })

    $("#submitExchange").click(function(){
        amount = $("#tokenAmount").val()
        receiver = $("#receiverWallet").val()
        console.log(receiver, amount);
        contractMM.methods.transfer(userAccount, receiver, amount).send({
            from: userAccount
        }).then(function (result) {
            console.log(result);
        })
    })
});
