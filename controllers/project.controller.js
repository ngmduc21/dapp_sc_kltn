const res = require("express/lib/response");

var employeeModel = require("../models/employee.model");
var projectModel = require('../models/project.model')
var finishedProjectModel = require('../models/finishedProject.model')
var assignedModel = require('../models/assigned.model')

var finishedProjectID = ""

module.exports.index = (req, res) => {
    res.render('project/index')
}

module.exports.create = (req, res) => {
    employeeModel.find((error, employee) => {
        if(!error){
            res.render('project/create', {
                data: employee
            })
        }else{
            console.log('Users list: Unable to fetch data!')
        }
    })
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
                data: project,
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
    console.log('Finishing project:',id)
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
        res.json({result: 0, message: "Not enough required information!"})
    } else {
        var newProject = new projectModel({
            name: req.body.name,
            client: req.body.client,
            leader: req.body.leader,
            numberOfMembers: req.body.numberOfMembers,
            budget: req.body.budget,
            listMembers: [req.body.leader],
            date: Date.now(),
        })

        newProject.save(function(error){
            if(error){
                console.log(error)
                res.json({result:0, message: 'Got error when try to save information to MongoDB!'});
            }else {
                console.log("Đã tạo thành công dự án mới!")
                res.json({result:1, message: newProject._id})
                var newAssigned = new assignedModel({
                    projectID: newProject._id,
                    projectName: newProject.name,
                    employeeID: [],
                    performance: []
                })
                newAssigned.save(function(error2){
                    if(error2){
                        console.log(error2)
                        //res.json({result:0, message: 'Got error when try to save information to MongoDB!'});
                    }else {
                        console.log("Đã tạo thành công assign mới cho dự án!")
                        //res.json({result:1, message: newProject._id})
                    } 
                })
            }
        })
    }
}

// Process finish project
module.exports.postFinish = (req, res) => {
    console.log(req.body)
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
                //res.json({result:0, message: 'Got error when try to save information to MongoDB!'});
            }else {
                console.log(newProject)
                //res.json({result:1, message: newFinishedProject});
            }
        })
    }
    res.redirect("/project")
} 

module.exports.delete =(req, res) => {
    var id = req.body.id
    finishedProjectID = id
    console.log('Deleting project:', id)
    projectModel.deleteOne({_id: id}, (error, project) => {
        if(!error){
            console.log("Deleted project:", id)
            res.json({result:1, message: 'Deleted!'});
        }else{
            console.log("Failed to delete project:", id)
            res.json({result:0, message: 'Failed!'});
        }
    })
}

module.exports.create =(req, res) => {
    res.render("project/create");
}


module.exports.createList = (req, res) => {
    employeeModel.find((error, employee) => {
        if(!error){
            res.render('project/create', {
                data: employee
            })
        }else{
            console.log('Users list: Unable to fetch data!')
        }
    })
}

module.exports.searchLeader = (req, res) => {
    if(!req.body.name){
        res.json({result: 0, message: "Not enough required information!"})
    }else{
        employeeModel.findOne({name: req.body.name}, (error, employee) => {
            if (!error){
                res.json({result: 1, message: employee})
            }
            else {
                res.json({result: 0, message: "Cant find email"})
            }
        })
    }
}

module.exports.addMembers = (req, res) => {
    var id = req.params.id
    console.log('Adding members for project:',id)
    assignedModel.findOne({projectID: id}, (error, assigned) => {
        if (!error){
            employeeModel.find((error, employee) => {
                if(!error){
                    projectModel.findOne({_id: id}, (error, project) => {
                        res.render('project/addMembers', {
                            employee: employee, project: project, assigned: assigned
                        })
                    })
                }else{
                    console.log('Users list: Unable to fetch data!')
                }
            })
        }
        else {
            console.log('Project id: Unable to get project data!')
        }
    })
}

module.exports.addToProject = (req, res) => {
    console.log(req.body)
}