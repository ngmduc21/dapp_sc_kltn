var employeeModel = require("../models/employee.model");

module.exports.login = (req, res) => {
    res.render('auth/login')
}

async function getEmployee(email){
    var employee = await employeeModel.findOne({email: email})
    return employee
}

module.exports.postLogin = async(req, res) => {
    console.log(req.body)
    var email = req.body.email
    var passwd = req.body.passwd
    var employee = await getEmployee(email)
    if(employee){
        console.log(employee)
        console.log("Found employee matched this email.")
        if(employee.passwd == passwd){
            console.log('Employee login successfully!')
            res.json({result: 1, message: 'Login successfully'})
        }else{
            console.log('Employee login failed: wrong password!')
            res.json({result: 0, message: 'Wrong password!'})
        }
    }else{
        console.log("Did not find any employee with this email.")
        res.json({result: 0, message: 'Email is not exist!'})
    }

    

}