var express = require('express');
var app = express();

var projectRoute = require('../routes/project.route.js');
// Su dung bodyParser
var bodyParser = require('body-parser');
var addProject = bodyParser.urlencoded({extended: false});

// Thiết lập front-end
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static('stuff'));

app.use('/project', projectRoute);

app.get('/project', function(req, res){
    res.render('/project/index');
})

// app.post('/project/create', addProject, function(req, res){
//     console.log(req.body);
//     res.render('/project/create');
// })

app.listen(3000);