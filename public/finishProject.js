
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

    $("#btnFinishProject").click(function(){
        if(userAccount.length == 0){
            alert("Please login MetaMask!");
        }else{
            $.post("./project/finish")
        }}
    );
})

