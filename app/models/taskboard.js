var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/taskboard');

/* Project */
var ProjectSchema = mongoose.Schema ({
	projectname: String,
	datecreated: {type: Date, default: Date.now},
	userofproject: [UserSchema]
})

mongoose.model('Project', ProjectSchema);
var ProjectModel = mongoose.model('Project');

/* Task*/
var TaskSchema = mongoose.Schema ({
	title: String,
	description: String,
	tags: String,
	taskassign:[{
		assign: { type: String, ref: 'User'}
	}],
	datecreated: { type: Date, default: Date.now },
	taskhistory: [{
		datecreated: Date,
		datefinished: Date,
		timemove: Date,
	}],
	taskcomment: [{
		comment: {type:String, ref:'User'},
		datecreated: {type: Date, default: Date.now}
	}]
})

mongoose.model('Task',TaskSchema );
var TaskModel = mongoose.model('Task');

/*User, member*/
var UserSchema = mongoose.Schema({
	username: String,
	email: String,
	password: String
})

mongoose.model('User', UserSchema);
var UserModel = mongoose.model('User');

// task_history_id: {type: Schema.Types.ObjectId};