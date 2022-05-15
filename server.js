// Khai báo thư viện cơ bản
require('dotenv').config()

var express = require('express');
const jwt = require('jsonwebtoken')
const verifyToken = require('./middleware/auth')
const res = require('express/lib/response');
var app = express();

const generateTokens = payload => {
    const {id, username} = payload
    // Create JWT
    const accessToken = jwt.sign({id, username}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '60s'
    })

    const refreshToken = jwt.sign({id, username}, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '1h'
    })
    return { accessToken, refreshToken }
}

const updateRefreshToken = (username, refreshToken) => {
    users = users.map(user => {
        if (user.username === username) 
        return {
            ...user,
            refreshToken
        }
        return user
    })
}

// user database
app.use(express.json())
let users = [
    {
        id: 1,
        username: 'henry',
        refreshToken: null
    },
    {
        id: 2,
        username: 'jim',
        refreshToken: null
    }
]

const posts = [
    {
        userId: 1,
        post: 'Nguoi dung so 1 da dang nhap'
    },
    {
        userId: 2,
        post: 'Nguoi dung so 2 da dang nhap'
    }
]

// Import các routes
var dashboardRoute = require('./routes/dashboard.route.js')
var userRoute = require('./routes/users.route')
var projectRoute = require('./routes/project.route')

// Khai báo đường dẫn thư mục public (để rút gọn mỗi khi gọi)
app.use(express.static('public'));
app.use("/scripts", express.static(__dirname + "/node_modules/web3.js-browser/build/"));

// Thiết lập front-end
app.set("view engine", "ejs");
app.set("views", "./views");

// Kết nối vào MongoDB
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://dapp2022:Dapp_sc2022@dappcluster.fi81j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
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

// Login
app.post('/login', (req, res) => {
    const username = req.body.username
    const user = users.find(user => user.username === username)

    if (!user) return res.sendStatus(401)

    const tokens = generateTokens(user)
    updateRefreshToken(username, tokens.refreshToken)

    console.log(users)

    res.json({tokens})
})

// Require new access token
app.post('/token', (req, res) => {
    const refreshToken = req.body.refreshToken
    if (!refreshToken) return res.sendStatus(401)

    const user = users.find(user => user.refreshToken === refreshToken)
    if (!user) return res.sendStatus(403)

    try {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)

        const tokens = generateTokens(user)
        updateRefreshToken(user.username, tokens.refreshToken)

        res.json(tokens)
    } catch (error) {
        console.log(error)
        res.sendStatus(403)
    }
})

// Delete refresh token if user logout
app.delete('/logout', verifyToken, (req, res) => {
    const user = users.find(user => user.id === req.userId)
    updateRefreshToken(user.username, null)
    console.log(users)
})

// Server listen trên port
var port = 3000
app.listen(port, function () {
    console.log("Server listening on port", port)
});
