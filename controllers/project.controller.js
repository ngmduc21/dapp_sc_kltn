module.exports.index = (req, res) => {
    res.render('project/index')
}

module.exports.list = (req, res) => {
    res.render('project/list');
}

module.exports.create =(req, res) => {
    res.render("project/create");
}