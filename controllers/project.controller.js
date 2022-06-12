const res = require("express/lib/response");

var employeeModel = require("../models/employee.model");
var projectModel = require('../models/project.model')
var finishedProjectModel = require('../models/finishedProject.model')
var assignedModel = require('../models/assigned.model')
var taskModel = require('../models/task.model')

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

async function getEmployee(list){
    var member = []
    for(var i=0; i<list.length;i++){
        var mem = await employeeModel.findOne({_id: list[i]})
        member.push(mem.name)
        }
    return member
}

async function getProject(id){
    var project = await projectModel.findOne({_id: id})
    return project
}

// Get details of each project
module.exports.getDetail = async(req, res) => {
    var id = req.params.id
    var list = []
    console.log('Get detail of project:',id)
    projectModel.findOne({_id: id}, async(error, project) => {
        if (!error && project != null){
            list = project.listMembers
            var member = await getEmployee(list)
            res.render('project/detail', {
                data: project, member: member
            })
        }
        else {
            console.log('Project id: Unable to get project data!')
        }
    })
}

// Finish a project
module.exports.finish = async(req, res) => {
    var id = req.params.id
    console.log('Finishing project:',id)
    var project = await getProject(id)
    var task = await taskModel.find({project: id})
    var taskName1 = [], taskName2 = [], taskName3 = []
    var point1 = 0, point2  = 0, point3  = 0, name1, name2, name3
    name1 = task[0].memName
    for(var i=0; i<task.length; i++){
        if(task[i].memName != name1 && name2 == null){
            name2 = task[i].memName
        }else if(task[i].memName != name1 && task[i].memName != name2 && name3 == null){
            name3 = task[i].memName
        }
    }
    console.log(name1, name2, name3)
    for(var i=0; i<task.length; i++){
        if(task[i].memName == name1){
            point1 += Number(task[i].point)
            taskName1.push(task[i].name)
        }else if(task[i].memName == name2){
            point2 += Number(task[i].point)
            taskName2.push(task[i].name)
        }else if(task[i].memName == name3){
            point3 += Number(task[i].point)
            taskName3.push(task[i].name)
        }
    }
    console.log(taskName1, taskName2, taskName3)
    console.log(point1, point2, point3)
    res.render('project/finish', {
        data: project, name1: name1, name2: name2, name3: name3, point1: point1,
        point2: point2, point3: point3, taskName1: taskName1, taskName2: taskName2,
        taskName3: taskName3,
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
            listMembers: [req.body.lead, req.body.mem1, req.body.mem2, req.body.mem3],
            date: Date.now(),
        })

        newProject.save(function(error){
            if(error){
                console.log(error)
                res.json({result: 0, message: 'Got error when try to save information to MongoDB!'});
            }else {
                console.log("Đã tạo thành công dự án", newProject.name)
                res.json({result: 1, message: newProject.name})
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
            res.json({result:1, message: 'Success'});
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



module.exports.createTask = async(req, res) => {
    var id = req.params.id
    var list = []
    console.log('Add tasks for project:',id)
    projectModel.findOne({_id: id}, async(error, project) => {
        if (!error && project != null){
            list = project.listMembers
            var member = await getEmployee(list)
            res.render('project/createTask', {
                data: member, id: id
            })
        }
        else {
            console.log('Project id: Unable to get project data!')
        }
    })
    
}

module.exports.postTask = (req, res) => {
    if(!req.body.name || !req.body.point || !req.body.project || !req.body.member) {
        console.log("Not enough required information!")
        res.json({result: 0, message: "Not enough required information!"})
    } else {
        var newTask = new taskModel({
            project: req.body.project,
            employee: req.body.member,
            name: req.body.name,
            point: req.body.point,
            memName: req.body.memName,
        })

        newTask.save(function(error){
            if(error){
                console.log(error)
                res.json({result: 0, message: 'Got error when try to save information to MongoDB!'});
            }else {
                console.log("Đã tạo thành công task", newTask.name)
                res.json({result: 1, message: newTask.name})
            }
        })
    }
}

module.exports.taskManager = (req, res) => {
    var id = req.params.id
    modifyProjectID = id
    console.log('Modifying project:',id)
    taskModel.find({project: id}, (error, task) => {
        if (!error){
            res.render('project/task', {
                data: task, id: id
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