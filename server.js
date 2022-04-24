var express = require('express');
const res = require('express/lib/response');
var app = express();

// Import route
var dashboardRoute = require('./routes/dashboard.route.js')
var userRoute = require('./routes/users.route')

// Khai bao thu muc public
app.use(express.static('public'));
app.use("/scripts", express.static(__dirname+"/node_modules/web3.js-browser/build/"));

// Cai dat front end
app.set("view engine", "ejs");
app.set("views", "./views");

// Ket noi MongoDB
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

app.get('/', (req, res) => {
    res.render('index')
})

app.use('/users', userRoute);

app.listen(3000, function(){
    console.log("Server listening on port 3000")
});
