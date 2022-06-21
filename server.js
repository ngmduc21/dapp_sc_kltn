// Khai báo thư viện cơ bản
require('dotenv').config()

var express = require('express');
//const authServer = require('./authServer')
const res = require('express/lib/response');
var app = express();

// Import các routes
var dashboardRoute = require('./routes/dashboard.route.js')
var userRoute = require('./routes/users.route')
var projectRoute = require('./routes/project.route')
var transferRoute = require('./routes/transfer.route')
var adminRoute = require('./routes/admin.route.js')
var authRoute = require('./routes/auth.route')

// Khai báo đường dẫn thư mục public (để rút gọn mỗi khi gọi)
app.use(express.static('public'));
app.use("/scripts", express.static(__dirname + "/node_modules/web3.js-browser/build/"));

// Thiết lập front-end
app.set("view engine", "ejs");
app.set("views", "./views");

// Kết nối vào MongoDB
const mongoose = require('mongoose');
mongoose.connect(process.env.DBCONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
    if (err) {
        console.log("MongoDB connected fail" + err);
    } else {
        console.log("MongoDB connected successfully");
    }
});

// Sử dụng bodyParse
var bodyParse = require('body-parser');
const { update } = require('./models/employee.model');
app.use(bodyParse.urlencoded({ extended: false }));

var cookieParser = require('cookie-parser')
app.use(cookieParser())
// Khai báo server và socket.io
var server = require('http').Server(app);
var io = require('socket.io')(server);

// Màn hình render khi truy cập vào app
//app.get('/', verifyToken, (req, res) => {
app.get('/', (req, res) => {
    res.render('index')
    //res.json(posts.filter(post => post.userId === req.userId))
})

// Khai báo các link sử dụng route nào
app.use('/users', userRoute);

app.use('/project', projectRoute);

app.use('/transfer', transferRoute)

app.use('/admin', adminRoute)

app.use('/auth', authRoute)

// Server listen trên port
app.listen(process.env.PORT, function () {
    console.log("Server listening on port", process.env.PORT)
});

// })