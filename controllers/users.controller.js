var employeeModel = require("../models/employee");

module.exports.index = (req, res) => {
    res.render("users/index");
}

module.exports.list = (req, res) => {
    employeeModel.find((error, employee) => {
        if(!error){
            res.render('users/list', {
                data: employee
            })
        }else{
            console.log('Users list: Unable to fetch data!')
        }
    })
}

module.exports.getDetail = (req, res) => {
    var id = req.params.id
    console.log('Get detail of project:',id)
    employeeModel.findOne({_id: id}, (error, employee) => {
        if (!error){
            res.render('users/detail', {
                data: employee
            })
        }
        else {
            console.log('Users id: Unable to get users data!')
        }
    })
}

module.exports.create =(req, res) => {
    res.render("users/create");
}

module.exports.postCreate = (req, res) => {
    if(!req.body.email || !req.body.fullName || !req.body.employeeID) {
        res.json({result:0, message: "Not enough information required!"});
    } else {
        var newEmployee = new employeeModel({
            email: req.body.email,
            name: req.body.fullName,
            employeeID: req.body.employeeID,
            phone: req.body.phone,
            isPaid: false, 
            walletAddress: '',
            date: Date.now(),
        });

        newEmployee.save(function(err){
            if(err){
                res.json({result:0, message: 'Got error when try to save information to MongoDB!'});
            }else {
                res.json({result:1, message: newEmployee});
            }
        }); 
    }
}
