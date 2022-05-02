// Khai báo thư viện cơ bản
var express = require('express');
const res = require('express/lib/response');
var app = express();

// Import các routes
var dashboardRoute = require('./routes/dashboard.route.js')
var userRoute = require('./routes/users.route')
var projectRoute = require('./routes/project.route')

// Khai báo đường dẫn thư mục public (để rút gọn mỗi khi gọi)
app.use(express.static('public'));
app.use("/scripts", express.static(__dirname+"/node_modules/web3.js-browser/build/"));

// Thiết lập front-end
app.set("view engine", "ejs");
app.set("views", "./views");

// Kết nối vào MongoDB
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://dapp2022:Dapp_sc2022@dappcluster.fi81j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}, function(err) {
    if(err){
        console.log("MongoDB connected fail" + err);
    } else {
        console.log("MongoDB connected successfully");
    }
});

// Sử dụng bodyParse
var bodyParse = require('body-parser');
app.use(bodyParse.urlencoded({extended:false}));

// Khai báo server và socket.io
var server = require('http').Server(app);
var io = require('socket.io')(server);

// Màn hình render khi try cập vào app
app.get('/', (req, res) => {
    res.render('index')
})

// Khai báo các link sử dụng route nào
app.use('/users', userRoute);

app.use('/project', projectRoute);

// Server listen trên port
app.listen(3000, function(){
    console.log("Server listening on port 3000")
});
