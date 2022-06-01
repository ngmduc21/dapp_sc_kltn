module.exports.index = (req, res) => {
    res.render("transfer/index");
}

module.exports.exchange = (req, res) => {
    res.render("transfer/exchange");
}

module.exports.reward = (req, res) => {
    res.render("transfer/reward");
}

module.exports.test = (req, res) => {
    res.render("transfer/indextest");
}
// const Web3 = require('web3');
// const PMC = require('./contracts/PMC.json');

// module.exports.info = async () => {
//     const web3 = new Web3 ('http://127.0.0.1:7545');
//     const contract = await new web3.eth.Contract(PMC.abi, '0x01431642f33Ac4e1fBEdd49821baC118266BeD19')
//     const name = await contract.methods.name().call();
//     const symbol = await contract.methods.symbol().call();
//     const decimal = await contract.methods.decimal().call();
//     console.log(name, symbol, decimal);
// }
