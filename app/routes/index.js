var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ProjectModel = mongoose.model('Project');
var TaskModel = mongoose.model('Task');
var UserModel = mongoose.model('User');

/* GET home page. */
router.get('/', function(req, res, next) {

    res.render('index', {
        title: 'Task Board'
    });
});

/*CRUD task*/

router.get('/task/', function(req, resp) {
    return TaskModel.find(function(err, task) {
        if (!err) {
            return resp.send(task);
        } else {
            return console.log(err);
        }
    });
});

// get Task  with projectId
router.get('/task/projectId/:projectId', function(req, resp) {
    TaskModel.find({projectId: req.params.projectId}, function(err, tasks) {
        if (!err) {
            return resp.send(tasks);
        } else {
            console.log(err);
            return resp.send('ERROR');
        }
    });
});

//get TaskId
router.get('/task/:id', function(req, resp) {
    TaskModel.findById(req.params.id, function(err, task) {
        if (!err) {
            return resp.send(task);
        } else {
            console.log(err);
            return resp.send('ERROR');
        }
    });
});

//post Task
router.post('/task', function(req, resp) {
    var assignUserId = new mongoose.Schema.ObjectId(req.body.taskassign);
    var commentUserId = new mongoose.Schema.ObjectId(req.body.taskcomment);
    var task = new TaskModel({
        title: req.body.title,
        description: req.body.description,
        tags: req.body.tags,
        taskassign: assignUserId,
        datecreated: req.body.datecreated,
        taskhistory: req.body.taskhistory,
        taskcomment: commentUserId,
        projectId : req.body.projectId
    });
    console.log(req.body.title);
    task.save(function(err, taskData) {
        if (!err) {
            console.log('created');
            return resp.send(taskData);
        } else {
            console.log(err);
            return resp.send('ERROR');
        }
    });
});

//post Task with ProjectId

router.post('/task/projectId/:projectId', function(req, resp) {
   
    var assignUserId = new mongoose.Schema.ObjectId(req.body.taskassign);
    var commentUserId = new mongoose.Schema.ObjectId(req.body.taskcomment);
    
    var task = new TaskModel({
        title: req.body.title,
        description: req.body.description,
        tags: req.body.tags,
        taskassign: assignUserId,
        datecreated: req.body.datecreated,
        taskhistory: req.body.taskhistory,
        taskcomment: commentUserId,
        projectId : req.body.projectId
    });
    
    task.save(function(err, taskData) {
        if (!err) {
            console.log('created');
            return resp.send(taskData);
        } else {
            console.log(err);
            return resp.send('error');
        }
    });
});


router.get('/task/:id', function(req, resp) {
    TaskModel.findById(req.params.id, function(err, task) {
        if (!err) {
            return resp.send(task);
        } else {
            console.log(err);
            return resp.send('ERROR');
        }
    });
});

router.put('/task/:id', function(req, resp) {
    return TaskModel.findById(req.params.id, function(err, task) {
        task.title = req.body.title;
        task.description = req.body.description;
        task.datecreated = req.body.datecreated;
        task.tags = req.body.tags;
        task.taskassign = req.body.taskassign;
        task.datecreated = req.body.datecreated;
        task.taskhistory = req.body.taskhistory;
        task.taskcomment = req.body.taskcomment;

        return task.save(function(err) {
            if (!err) {
                console.log('task updated');
                return resp.send(task);
            } else {
                console.log(err);
                return resp.send('ERROR');
            }
        });
    });
});

router.delete('/task/:id', function(req, resp) {
    TaskModel.findById(req.params.id, function(err, task) {
        return task.remove(function(err) {
            if (!err) {
                console.log('task removed');
                return resp.send('1 task removed');
            } else {
                console.log(err);
                return resp.send('ERROR');
            }
        });
    });
});

/*CRUD User*/

router.get('/user', function(req, resp) {
    return UserModel.find(function(err, user) {
        if (!err) {
            return resp.send(user);
        } else {
            return console.log(err);
        }
    });
});

router.post('/user', function(req, resp) {
    var user = new UserModel({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    console.log(req.body.username);
    user.save(function(err, userData) {
        if (!err) {
            console.log('created new user');
            return resp.send(userData);
        } else {
            console.log(err);
            return resp.send('ERROR');
        }
    });
});

router.get('/user/:id', function(req, resp) {
    UserModel.findById(req.params.id, function(err, user) {
        if (!err) {
            return resp.send(user);
        } else {
            console.log(err);
            return resp.send('ERROR');
        }
    });
});


router.put('/user/:id', function(req, resp) {
    return UserModel.findById(req.params.id, function(err, user) {
        user.username = req.body.username;
        user.email = req.body.email;
        user.password = req.body.password;


        return user.save(function(err) {
            if (!err) {
                console.log('user updated');
                return resp.send(user);
            } else {
                console.log(err);
                return resp.send('ERROR');
            }
        });
    });
});

router.delete('/user/:id', function(req, resp) {
    UserModel.findById(req.params.id, function(err, user) {
        return user.remove(function(err) {
            if (!err) {
                console.log('user removed');
                return resp.send('1 user removed');
            } else {
                console.log(err);
                return resp.send('ERROR');
            }
        });
    });
});

/*CRUD Project*/

router.get('/project', function(req, resp) {
    return ProjectModel.find(function(err, project) {
        if (!err) {
            return resp.send(project);
        } else {
            return console.log(err);
        }
    });
});

router.get('/project/:id', function(req, resp) {
    ProjectModel.findById(req.params.id, function(err, project) {
        if (!err) {
            return resp.send(project);
        } else {
            console.log(err);
            return resp.send('ERROR');
        }
    });
});


router.post('/project', function(req, resp) {
    var project = new ProjectModel({
        
        projectname: req.body.projectname,
        description: req.body.description,
        datecreated: req.body.datecreated,
        userofproject: req.body.userofproject,
        taskId : req.body.tasks
    });
    console.log(req.body.projectname);
    project.save(function(err, projectData) {
        if (!err) {
            console.log('created new project');
            return resp.send(projectData);
        } else {
            console.log(err);
            return resp.send('ERROR');
        }
    });
});


router.put('/project/:id', function(req, resp) {
    return ProjectModel.findById(req.params.id, function(err, project) {
        project.projectname = req.body.projectname;
        project.description = req.body.description,
        project.datecreated = req.body.datecreated;
        project.userofproject = req.body.userofproject;


        return project.save(function(err) {
            if (!err) {
                console.log('project updated');
                return resp.send(project);
            } else {
                console.log(err);
                return resp.send('ERROR');
            }
        });
    });
});

router.delete('/project/:id', function(req, resp) {
    ProjectModel.findById(req.params.id, function(err, project) {
        return project.remove(function(err) {
            if (!err) {
                console.log('project removed');
                return resp.send('1 project removed');
            } else {
                console.log(err);
                return resp.send('ERROR');
            }
        });
    });
});

module.exports = router;