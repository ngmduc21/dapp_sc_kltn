const res = require("express/lib/response");

var employeeModel = require("../models/employee.model");
var projectModel = require('../models/project.model')
var finishedProjectModel = require('../models/finishedProject.model')
var assignedModel = require('../models/assigned.model')

var finishedProjectID = ""
var modifyProjectID = ""
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
    var member = []
    var count=0
    console.log('Get detail of project:',id)
    projectModel.findOne({_id: id}, (error, project) => {
        if (!error && project != null){
            res.render('project/detail', {
                data: project, member: member
            })
        }
        else {
            console.log('Project id: Unable to get project data!')
        }
    })
}

module.exports.details = async(req, res) => {
    var id = req.params.id
    console.log('Get detail of project:',id)
    
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
        res.json({result: "Error", message: "Not enough required information!"})
    } else {
        var newProject = new projectModel({
            name: req.body.name,
            client: req.body.client,
            leader: req.body.leader,
            numberOfMembers: 3,
            budget: req.body.budget,
            assigned: "none",
            date: Date.now(),
        })

        newProject.save(function(error){
            if(error){
                console.log(error)
                res.json({result: "Error", message: 'Got error when try to save information to MongoDB!'});
            }else {
                console.log("Đã tạo thành công dự án", newProject.name)
                //res.json({result: "Create", message: newProject._id})
                var newAssigned = new assignedModel({
                    projectID: newProject._id,
                    projectName: newProject.name,
                    employeeID: [req.body.lead, req.body.mem1, req.body.mem2, req.body.mem3],
                    performance: []
                })
                newAssigned.save(function(error2){
                    if(error2){
                        console.log(error2)
                        console.log("Danh sach thanh vien", newAssigned.employeeID)
                        res.json({result: "Error", message: 'Got error when try to save information to MongoDB!'});
                    }else {
                        console.log("Đã tạo thành công assigned mới cho dự án", newProject.name)
                        projectModel.updateOne({_id: newProject._id}, {$set: {assigned: newAssigned._id}}, function(error3, res){
                            if(!error3){
                                console.log("Đã cập nhật assigned id cho project", newProject.name)
                            }
                        })
                        res.json({result: "Success", message: newProject._id})
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
        if(!error && project != null ){
            console.log("Deleted project:", id)
            
            assignedModel.deleteOne({projectID: id}, (error2, assigned) => {
                if( !error2 && assigned != null){
                    console.log("Deleted assigned of project:", id)
                    res.json({result:1, message: 'Deleted!'});
                }else{
                    console.log("Failed to delete assigned of project:", id)
                    res.json({result:0, message: 'Failed!'});
                }
            })
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

module.exports.searchEmployee = (req, res) => {
    if(!req.body.name){
        res.json({result: 0, message: "Find employee: Not enough required information!"})
    }else{
        console.log(req.body.name)
        employeeModel.findOne({name: req.body.name}, (error, employee) => {
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

module.exports.addMembers = (req, res) => {
    if(!req.body.id){
        res.json({result: 0, message: "Add member to assigned: Not enough required information!"})
    }else{
        employeeModel.findOne({name: req.body.employee}, (error, employee) => {
            if (!error && employee != null){
                console.log("Found employee")
                assignedModel.updateOne({projectID: req.body.id}, {$set: {employeeID: employee._id}}, function(error, assigned){
                    if(!error){
                        console.log("Đã cập nhật assigned cho project", assigned.projectName)
                    }
                })
            }
        })
    
    }
}

module.exports.taskManager = (req, res) => {
    var id = req.params.id
    modifyProjectID = id
    console.log('Modifying project:',id)
    projectModel.findOne({_id: id}, (error, project) => {
        if (!error){
            res.render('project/task', {
                data: project,
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