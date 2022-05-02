var mongoose = require("mongoose");
var projectModel = require('../models/project')

module.exports.index = (req, res) => {
    res.render('project/index')
}

module.exports.list = (req, res) => {
    projectModel.find((error, project) => {
        if (!error){
            res.render('project/list', {
                data: project
            })
        }
        else {
            console.log('Project list: Unable to fetch data!')
        }
    })
}

module.exports.getDetail = (req, res) => {
    var id = req.params.id
    console.log('Get detail of project:',id)
    projectModel.findOne({_id: id}, (error, project) => {
        if (!error){
            res.render('project/detail', {
                data: project
            })
        }
        else {
            console.log('Project id: Unable to get project data!')
        }
    })
}

module.exports.finish = (req, res) => {
    var id = req.params.id
    console.log('Get detail of project:',id)
    projectModel.findOne({_id: id}, (error, project) => {
        if (!error){
            res.render('project/finish', {
                data: project,
                members: project.listMembers
            })
        }
        else {
            console.log('Project id: Unable to get project data!')
        }
    })
}

module.exports.create =(req, res) => {
    res.render("project/create");
}