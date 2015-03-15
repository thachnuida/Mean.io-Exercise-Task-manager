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
   
        $scope.men = ['John','Jack','Mark','Ernie'];
        $scope.women = ['Jane','Jill','Betty','Mary'];
        $scope.dropSuccessHandler = function($event,index,array){
            console.log('dddd');
            array.splice(index,1);
        };
        $scope.onDrop = function($event,$data,array){
            array.push($data);
        };
})

.controller('viewProjectCtrl', function($scope, $http, $stateParams, $state) {
    $scope.project = {};

    var id = $stateParams.id;

    $scope.viewProjectId = function(project) {
        $http.get('http://localhost:4100/project/' +id).then(function(resp){
        console.log('Success', resp);
        $scope.project = resp.data;
         $state.go('viewProject', {
                    'id': id
                });
        }, function(err){
        console.error('ERR', err);
        })
    };

    $scope.viewProjectId();

    $scope.tasks = [];

    $scope.viewTask = function() {
        $http.get('http://localhost:4100/task/projectId/' +id)
            .success(function(data) {
                console.log(data);
                console.log('view task');
                $scope.tasks = data;
                  $state.go('viewProject', {
                    'id': id
                });
            });
    };
    $scope.viewTask();
//when post data, truyen tham so $scope.task thi moi lay duoc du lieu tu $scope task
    $scope.tasks = [];

    var projectId = $stateParams.id;
    console.log(projectId);
    $scope.createTaskProjectId = function() {
        console.log(projectId);
        $scope.task.projectId = projectId;
        $http.post('http://localhost:4100/task/projectId/' + projectId, $scope.task)
            .success(function(data) {
                console.log(data);
                $scope.tasks.push(data);
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
//drag and drop task in viewproject
  $scope.tasks = [];
  $scope.tasks1 = [];
  $scope.tasks2 = [];
  $scope.tasks3 = [];

  // Limit items to be dropped in list1
  $scope.optionsList1 = {
    accept: function(dragEl) {
      if ($scope.tasks.length >= 2) {
        return false;
      } else {
        return true;
      }
    }
  };

  $scope.updateTask = function(taskid) {
      $state.go('edit', {id : taskid});
  };

//drapdrop

        $scope.men = ['John','Jack','Mark','Ernie'];
        $scope.women = ['Jane','Jill','Betty','Mary'];
        $scope.dropSuccessHandler = function($event,index,array){
            array.splice(index,1);
        };
        $scope.onDrop = function($event,$data,array){
            array.push($data);
        };
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
  // $scope.tags = [
  //   { id: 1, name: 'Tag1' },
  // ];
   
  // $scope.loadTags = function(query) {
  //   return $http.get('http://localhost:4100/user');
  // };
})

.controller('ProjectCtrl', function($scope, $http, $stateParams, $state) {
    var id = $stateParams.id;

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
