const res = require("express/lib/response");

var projectModel = require('../models/project.model')
var finishedProjectModel = require('../models/finishedProject.model')

var finishedProjectID = ""

module.exports.index = (req, res) => {
    res.render('project/index')
}

// Listing project
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

// Get details of each project
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

// Finish a project
module.exports.finish = (req, res) => {
    var id = req.params.id
    finishedProjectID = id
    console.log('Get detail of project:',id)
    projectModel.findOne({_id: id}, (error, project) => {
        if (!error){
            res.render('project/finish', {
                data: project,
            })
        }
        else {
            console.log('Project id: Unable to get project data!')
        }
    })
}

// Process create project
module.exports.postcreate =(req, res) => {
    if(!req.body.name || !req.body.client || !req.body.budget) {
        console.log("Not enough required information!")
        //res.json({result: 0, message: "Not enough required information!"})
    } else {
        var newProject = new projectModel({
            name: req.body.name,
            client: req.body.client,
            name: req.body.leader,
            numberOfMembers: req.body.numberOfMembers,
            budget: req.body.budget,
            listMembers: [req.body.member1, req.body.member2, req.body.member3]
        })

        newProject.save(function(error){
            if(error){
                console.log(error)
                //res.json({result:0, message: 'Got error when try to save information to MongoDB!'});
            }else {
                console.log(newProject)
                //res.json({result:1, message: newProject});
            }
        })
    }
    res.redirect("/project")
}

// Process finish project
module.exports.postFinish = (req, res) => {
    id = finishedProjectID
    console.log('Get detail of project:',id)
    projectModel.findOne({_id: id}, (error, project) => {
        if (!error){
            res.render('project/finish', {
                data: project,
            })
            var newFinishedProject = new finishedProjectModel({
                name: req.body.name,
                client: req.body.client,
                budget: req.body.budget,
            })
        }
        else {
            console.log('Project id: Unable to get project data!')
        }
    })
    if(!req.body.name || !req.body.client || !req.body.budget) {
        console.log("Not enough required information!")
        //res.json({result: 0, message: "Not enough required information!"})
    } else {
        var newFinishedProject = new finishedProjectModel({
            name: req.body.name,
            client: req.body.client,
            budget: req.body.budget,
        })

        newFinishedProject.save(function(error){
            if(error){
                console.log(error)
                res.json({result:0, message: 'Got error when try to save information to MongoDB!'});
            }else {
                console.log(newProject)
                //res.json({result:1, message: newFinishedProject});
            }
        })
    }
    res.redirect("/project")
} 

module.exports.create =(req, res) => {
    res.render("project/create");
}