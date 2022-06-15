module.exports.dayoffAmount = (res, req, next) => {
    if(!req.body.amount && !req.body.select){
        res.json({result: 0, message: "Amount/Select is empty!"})
    }else{
        var amount = req.body.amount
        var select = req.body.select
        if (select == 1 && amount < 1000){
            res.json({result: 0, message: "Giá trị không được thấp hơn 1000"})
        }else if (select == 2 && amount < 2000){
            res.json({result: 0, message: "Giá trị không được thấp hơn 2000"})
        }else if (select == 3 && amount < 3000){
            res.json({result: 0, message: "Giá trị không được thấp hơn 3000"})
        }else{
            var b = amount % 1000
            var finalAmount = amount - b
            res.json({result: 1, message: finalAmount})
        }
    }
    next()
}