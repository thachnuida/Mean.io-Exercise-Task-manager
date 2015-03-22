angular.module('taskboardApp')

.controller('TaskCtrl', function($scope, $http, $stateParams, $state) {

    var id = $stateParams.id;

    $scope.tasks = [];

    $scope.createProject = function(project) {
        $http.post('http://localhost:4100/project/', project)
            .success(function(data) {
                console.log(data);
                $state.go('home');
                
            });
    };

    $scope.cancel = function() {
        $scope.project = [];
    };

    $scope.viewProject = function() {
        $http.get('http://localhost:4100/project/')
            .success(function(data) {
                console.log(data);
                console.log('view project');
                $scope.projects = data;
            });
    };
    $scope.viewProject();
})

.controller('createTaskCtrl', function($scope, $http, $stateParams, $state) {
    var id = $stateParams.id;
    $scope.tasks = [];

    $scope.createTask = function(task) {
        $http.post('http://localhost:4100/task/', task)
            .success(function(data) {
                console.log(data); 
                $state.go('home');
            });
    };

    $scope.reset = function() {
        $scope.task = [];
   };
   
})

.controller('viewProjectCtrl', function ($scope, $http, $stateParams, $state) {
    $scope.project = {};

    var id = $stateParams.id;

    $scope.viewProjectId = function(project) {
        $http.get('http://localhost:4100/project/' +id).then(function(resp){
        console.log('Success', resp);
        $scope.project = resp.data;
        }, function(err){
        console.error('ERR', err);
        })
    };

    $scope.viewProjectId();

    $scope.tasks = [];
    $scope.tasksDoing =  [];
    $scope.tasksReview = [];
    $scope.tasksDone = [];
    $scope.tasksTodo =  [];

    $scope.viewTask = function() {
        $http.get('http://localhost:4100/task/projectId/' +id)
            .success(function(data) {
                console.log('view task', data);
                $scope.tasks = data;

       for(var index = 0; index < $scope.tasks.length; index ++){
            if ($scope.tasks[index].state == "todo") {
                $scope.tasksTodo.push($scope.tasks[index])
            }
            else if ($scope.tasks[index].state == "doing") {
                $scope.tasksDoing.push($scope.tasks[index]);
            }
            else  if ($scope.tasks[index].state == "review") {
                $scope.tasksReview.push($scope.tasks[index]);
            }
            else  if ($scope.tasks[index].state == "done") {
                $scope.tasksDone.push($scope.tasks[index]);
            }
       }

            });
    };
    $scope.viewTask();
//when post data, truyen tham so $scope.task thi moi lay duoc du lieu tu $scope task
  

    var projectId = $stateParams.id;
    console.log(projectId);
    $scope.createTaskProjectId = function() {
        console.log(projectId);
        $scope.task.projectId = projectId;
        $http.post('http://localhost:4100/task/projectId/' + projectId, $scope.task)
            .success(function(data) {
                console.log(data);
                $scope.tasksTodo.push(data);
            });
    };

    $scope.reset = function() {
        $scope.task = [];
    };
     
    //use id in url $state.go with id

    $scope.viewDetailTaskId = function(id) {
        $http.get('http://localhost:4100/task/' + id)
            .success(function(data) {
                console.log(projectId);
                console.log(data);
                $scope.tasks = data;
                $state.go('viewTask', {
                    'id': id
                });
                $scope.tasks = data;
            });
    };

    $scope.updateTask = function(taskid) {
    $state.go('edit', {id : taskid});
  };

//drag and drop task in viewproject
  

    $scope.task;
          
    $scope.setTaskTodo = function( )
    {   
    $http.put('http://localhost:4100/updatestatusTask/' + $scope.task.index, {state : "todo"});
    
    }

    $scope.setTaskDoing = function( )
    {   
    
    $http.put('http://localhost:4100/updatestatusTask/' + $scope.task.index, {state : "doing"});
    }

    $scope.setTaskReview = function( )
    {   
   $http.put('http://localhost:4100/updatestatusTask/' + $scope.task.index, {state : "review"})
    }

    $scope.setTaskDone = function( )
    {   
    $http.put('http://localhost:4100/updatestatusTask/' + $scope.task.index, {state : "done"});
    }

  $scope.dragTask = function(event, ui, task){
    console.log("Drag", task);
    $scope.task = task;
  }
})

.controller('viewTaskCtrl', function($scope, $http, $stateParams, $state,tags) {
    $scope.task = {}; 
    var id = $stateParams.id;

    $http.get('http://localhost:4100/task/' + id).then(function(resp){
      console.log('Success', resp);
      $scope.task = resp.data;
      $scope.projectId = $scope.task.projectId;
      console.log($scope.projectId);
    }, function(err){
      console.error('ERR', err);
    })

    $scope.deleteTask = function(taskId) {
        $http.delete('http://localhost:4100/task/' + taskId)
        .success(function (data) {
            console.log('data', data);
            $state.go('viewProject', {
                    'id':  $scope.projectId
                });
        });
    };

    $scope.closeViewTask = function(){
        $state.go('viewProject', {
                    'id': $scope.projectId
                });
    };
    $scope.editTask = function(){
        $state.go('editTask',{
            'id': id
        });
    };

    $scope.tags = [
    { text: 'Admin' }
    ];

  $scope.loadTags = function(query) {
    return tags.load();
  };
 
})

.controller('ProjectCtrl', function($scope, $http, $stateParams, $state) {
    var id = $stateParams.id;

    $scope.createProject = function() {
        $http.post('http://localhost:4100/project', $scope.project)
            .success(function(data) {
                console.log(data);
                $scope.project.push(data);
            });
    };

    $scope.cancel = function() {
        $scope.project = [];
    };
})


.controller('editTaskCtrl', function($scope, $http, taskId, $state) {
    $scope.task = {};

    $http.get('http://localhost:4100/task/' + taskId).then(function(resp) {
        console.log('Success', resp);
        $scope.task = resp.data;
    }, function(err) {
        console.error('ERR', err);
    })

    $scope.cancelEdit = function() {
        $http.get('http://localhost:4100/task/' + taskId).then(function(resp) {
            console.log('Success', resp);
            $scope.task = resp.data;
        }, function(err) {
            console.error('ERR', err);
        })
        $scope.task = [];
    };
    
// truoc khi put thi lay du lieu tu task.model ve edit roi gui len lai, truyen them
    $scope.saveEditTask = function(task) {
        console.log(task);
        $http.put('http://localhost:4100/task/' + taskId, task).then(function(resp) {
            console.log('Success', resp);
            $scope.task = resp.data;
        }, function(err) {
            console.error('ERR', err);
        })
        $state.go('viewTask', {
            'id': taskId
        });
    };

    $scope.tags = [
    { text: 'Admin' }
    ];

    $scope.loadTags = function(query) {
    return tags.load();
    };
 
})

.service('tags', function($q) {
  var tags = [
    { "text": "Diem Thuy" },
    { "text": "Thanh Hien" },
    { "text": "Bich Huy" },
    { "text": "Anh Nga" },
    { "text": "Ngoc Anh" },
    { "text": "Thu Thao" }
  ];

  this.load = function() {
    var deferred = $q.defer();
    deferred.resolve(tags);
    return deferred.promise;
  };
});