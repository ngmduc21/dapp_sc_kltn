var employeeModel = require("../models/employee.model");

module.exports.index = (req, res) => {
    res.render("transfer/index");
}

module.exports.exchange = (req, res) => {
    res.render("transfer/exchange");
}

module.exports.reward = (req, res) => {
    res.render("transfer/reward");
}

module.exports.checkAmount = (req, res) => {
    if(!req.body.amount && !req.body.select){
        res.json({result: 0, message: "Amount/Select is empty!"})
    }else{
        var amount = req.body.amount
        var select = req.body.select
        console.log(amount, select)
        if (select == 1 && amount < 1000){
            res.json({result: 0, message: "Giá trị không được thấp hơn 1000"})
        }else if (select == 2 && amount < 2000){
            res.json({result: 0, message: "Giá trị không được thấp hơn 2000"})
        }else if (select == 3 && amount < 3000){
            res.json({result: 0, message: "Giá trị không được thấp hơn 3000"})
        }else{
            var b = amount % 1000
            var finalAmount = amount - b
            console.log(finalAmount)
            res.json({result: 1, message: finalAmount})
        }
    }
}

module.exports.searchEmployee = (req, res) => {
    if(!req.body.name){
        res.json({result: 0, message: "Find employee: Not enough required information!"})
    }else{
        console.log(req.body.name)
        employeeModel.findOne({employeeID: req.body.name}, (error, employee) => {
            if (!error && employee != null){
                res.json({result: 1, message: employee})
                console.log("Found employee")
            }
            else {
                res.json({result: 0, message: "Cant find employee"})
            }
        })
    }
}

