var employee = require("../models/employee");

module.exports.index = (req, res) => {
    res.render("users/index");
}

module.exports.list = (req, res) => {
    res.render('users/list');
}

module.exports.create =(req, res) => {
    res.render("users/create");
}

module.exports.postCreate = (req, res) => {
    if(!req.body.email || !req.body.fullName || !req.body.employeeID) {
        res.json({result:0, message: "Not enough information required!"});
    } else {
        var newEmployee = new employee({
            email: req.body.email,
            fullName: req.body.fullName,
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
