var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ProjectModel = require('Project');
var TaskModel = mongoose.model('Task');
var UserModel = mongoose.model('User');


/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Task Board' });
});

router.get('/task/:id', function ( req, resp ) {
    
//     var id = parseInt(req.params.id);
//     TaskModel.findOne( {'id': id}, function( err, task ) {
//         if( !err ) {
//             return resp.send( task );
//         } else {
//             console.log( err );
//             return resp.send('ERROR');
//         }
//     });
// });

    
var id = parseInt(req.params.id);

    TaskModel.findById( {'id': _id}, function( err, task ) {
        if( !err ) {
            return resp.send( task );
        } else {
            console.log( err );
            return resp.send('ERROR');
        }
    });
});


router.post( '/task', function (req, resp) {
    var task = new TaskModel({
        title: req.body.title,
        description: req.body.description,
        tags: req.body.tags,
        taskassign: req.body.taskassign,
        datecreated : req.body.datecreated,
        taskhistory : req.body.taskhistory,
        taskcomment: req.body.taskcomment
    });
    console.log(req.body.title);
    task.save( function( err, taskData ) {
        if( !err ) {
            console.log( 'created' );
            return resp.send( taskData );
        } else {
            console.log( err );
            return resp.send('ERROR');
        }
    });
});

router.delete('/task/id', function(req, resp){
    
})

module.exports = router;
