var express = require('express');
const res = require('express/lib/response');
var app = express();

app.use(express.static('public'));
app.use("/scripts", express.static(__dirname+"/node_modules/web3.js-browser/build/"));

app.set("view engine", "ejs");
app.set("views", "./views");

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://dapp2022:Dapp_sc2022@dappcluster.fi81j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}, function(err) {
    if(err){
        console.log("MongoDB connected fail" + err);
    } else {
        console.log("MongoDB connected successfully");
    }
});

var bodyParse = require('body-parser');
app.use(bodyParse.urlencoded({extended:false}));

var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000);

require("./controller/register")(app);

