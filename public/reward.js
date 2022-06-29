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
    
    $("#loading").hide()
    $("#select").hide()

    // Khai báo abi và địa chỉ của SC trên Network
    const token_abi = [
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
    const trade_abi = [
        {
            "inputs": [
                {
                    "internalType": "contract PMC",
                    "name": "_token",
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
            "name": "Cash",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "contract PMC",
                    "name": "_token",
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
            "name": "Dayoff",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
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
                    "name": "trader",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "TradeCash",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "trader",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "TradeDayoff",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "trader",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "TradeVoucher",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "contract PMC",
                    "name": "_token",
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
            "name": "Voucher",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]

    const tokenAddress = "0xf2b2827656fd40da32cfd9097088e8f9a7d46a60"
    const tradeAddress = '0xd86c35632b5caf1a30f5f52f00839c4ebe671d34'

    const ownersc = "0xB0c9f91A093A01a6eBA93eeEb45fBe291FB0d072"

    // Khởi tạo biến web3
    const web3 = new Web3(window.ethereum);
    window.ethereum.enable();

    // Kết nối đến SC và sử dụng ví MetaMask làm địa chỉ gọi SC
    var contractMMtoken = new web3.eth.Contract(token_abi, tokenAddress);
    var contractMMtrade = new web3.eth.Contract(trade_abi, tradeAddress);

    console.log(contractMMtoken);
    console.log(contractMMtrade);

    // Khởi tạo Web Socket kết nối với Infura để bắt các event từ SC emit ra
    var provider = new Web3.providers.WebsocketProvider("wss://rinkeby.infura.io/ws/v3/ebad9413b5c04f5a9f7eb4768b7237ed");
    var infura_web3 = new Web3(provider);

    var infura_contract_token = infura_web3.eth.Contract(token_abi, tokenAddress);
    var infura_contract_trade = infura_web3.eth.Contract(trade_abi, tradeAddress);

    console.log(infura_contract_token);
    console.log(infura_contract_trade);

    var eTransfer = 0, eTrade = 0
    // Bắt event mới nhất từ SC thông qua Infura
    infura_contract_token.events.Transfer({filter:{}, fromBlock:"latest"}, function(error, event){ 
        if(error){
            console.log(error);
        }else{
            console.log(event);
            eTransfer = 1
            if(eTransfer == 1 && eTrade == 1){
                $("#loading").hide()
                $.alert("Chuyển đổi thành công! Quay lại trong 3 giây.")
                setTimeout(function(){
                    window.location = "/transfer"
                }, 2500)
            }
        }
    })
    infura_contract_trade.events.TradeCash({filter:{}, fromBlock:"latest"}, function(error, event){ 
        if(error){
            console.log(error);
        }else{
            console.log(event);
            eTrade = 1
            if(eTransfer == 1 && eTrade == 1){
                $("#loading").hide()
                $.alert("Chuyển đổi thành công! Quay lại trong 3 giây.")
                setTimeout(function(){
                    window.location = "/transfer"
                }, 2500)
            }
        }
    })
    infura_contract_trade.events.TradeDayoff({filter:{}, fromBlock:"latest"}, function(error, event){ 
        if(error){
            console.log(error);
        }else{
            console.log(event);
            eTrade = 1
            if(eTransfer == 1 && eTrade == 1){
                $("#loading").hide()
                $.alert("Chuyển đổi thành công! Quay lại trong 3 giây.")
                setTimeout(function(){
                    window.location = "/transfer"
                }, 2500)
            }
        }
    })
    infura_contract_trade.events.TradeVoucher({filter:{}, fromBlock:"latest"}, function(error, event){ 
        if(error){
            console.log(error);
        }else{
            console.log(event);
            eTrade = 1
            if(eTransfer == 1 && eTrade == 1){
                $("#loading").hide()
                $.alert("Chuyển đổi thành công! Quay lại trong 3 giây.")
                setTimeout(function(){
                    window.location = "/transfer"
                }, 2500)
            }
        }
    })

    var userAccount = ""

    isMetamaskInstalled();

    connectMM().then((data) => {
        userAccount = data[0];
        console.log(userAccount);

        $("#senderWallet").val(userAccount)

        contractMMtoken.methods.balances(userAccount).call({
            from: userAccount
        }).then(function (result) {
            console.log(result)
            $("#senderAmount").val(result.toString());
        });
    }).catch((err) => {
        console.log(err);
        $("#senderWallet").val(err.message)
    });

    $("#rewardType").click(function(){
        if($("#mem1").val() != "Lựa chọn"){
            var type = $("#rewardType").val()
            if(type == "Ngày nghỉ"){
                $("#select").val(2)
                console.log($("#select").val())
            }else if(type == "Tiền mặt"){
                $("#select").val(1)
                console.log($("#select").val())
            }else if(type == "Voucher ăn uống 250k"){
                $("#select").val(3)
                console.log($("#select").val())
            }
        }
    })

    var oldAmount = 10
    $("#rewardAmount").change(function(){
        if($("#rewardAmount") != null && oldAmount != 0 && $("#select").val() != null){
            var amount = $("#rewardAmount").val()
            $.post("./transfer/checkAmount",{
                select: $("#select").val(),
                amount: amount
            }, function(data){
                if(data.result == 1){
                    var newAmount = data.message
                    $("#rewardAmount").val(newAmount)
                    oldAmount = newAmount
                }
            })
        }
    })

    $("#change").click(function(){
        $("#loading").show()
        setTimeout(function(){
            amount = $("#rewardAmount").val()
            console.log(amount)
            $.post("./transfer/checkAmount",{
                amount: amount,
                select: $("#select").val(),
            }, function(data){
                if(data.result == 1){
                    $("#rewardAmount").val(data.message)
                    amount = $("#rewardAmount").val()
                    if($("#select").val() == 1){
                        contractMMtrade.methods.Cash(tokenAddress, ownersc, amount).send({
                            from: userAccount
                        }).then(function (result) {
                            console.log(result);
                        })
                    }
                    else if($("#select").val() == 2){
                        contractMMtrade.methods.Dayoff(tokenAddress, ownersc, amount).send({
                            from: userAccount
                        }).then(function (result) {
                            console.log(result);
                        })
                    }
                    else if($("#select").val() == 3){
                        contractMMtrade.methods.Voucher(tokenAddress, ownersc, amount).send({
                            from: userAccount
                        }).then(function (result) {
                            console.log(result);
                        })
                    }
                }else{
                    $("#loading").hide()
                    alert(data.message)
                }
            })
            
        }, 1000)
    })
});
