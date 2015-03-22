var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/taskboard');

/* Project */
var ProjectSchema = mongoose.Schema ({
	projectname: String,
	description: String,
	datecreated: {type: Date, default: Date.now},
	userofproject: [UserSchema],
	taskId: {type: mongoose.Schema.ObjectId, ref :'Task'}
})

mongoose.model('Project', ProjectSchema);
var ProjectModel = mongoose.model('Project');

/* Task*/
var TaskSchema = mongoose.Schema ({
	title: String,
	description: String,
	tags: String,
	datecreated: { type: Date, default: Date.now },
	datefinished: {type: Date, default: Date.now},
	taskassign:[{
		assign: { type: mongoose.Schema.ObjectId, ref: 'User'}
	}],
	taskhistory: [{
		datecreated: {type: Date, default: Date.now},
		datefinished: {type: Date, default: Date.now},
		timemove: {type: Date, default: Date.now},
	}],
	taskcomment: String,
	projectId: {type: mongoose.Schema.ObjectId, ref: 'Project'},
	drag: { type: Boolean, default: true },
	state: {type: String, default: 'todo'}
})

mongoose.model('Task',TaskSchema );
var TaskModel = mongoose.model('Task');

mongoose.model('Task1',TaskSchema );
var TaskModel = mongoose.model('Task1');


/*User, member*/
var UserSchema = mongoose.Schema({
	username: String,
	email: String,
	password: String
})
mongoose.model('User', UserSchema);
var UserModel = mongoose.model('User');
