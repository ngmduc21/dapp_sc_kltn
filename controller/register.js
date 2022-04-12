var employee = require("../models/employee");

module.exports = function(app) {
    app.get("/", function(req, res) {
        res.render("registerLayout");
    });

    app.post("/register", function(req, res){
        if(!req.body.email || !req.body.name || !req.body.phone) {
            res.json({result:0, message: "Not enough information required!"});
        } else {
            var newEmployee = new employee({
                email: req.body.email,
                name: req.body.name,
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
    });
}