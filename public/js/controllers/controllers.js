angular.module('taskboardApp')

.controller('TaskCtrl', function($scope, $http, $stateParams, $state) {

    var id = $stateParams.id;

    $scope.tasks = [];

    

    $scope.viewTask = function() {
        $http.get('http://localhost:4100/task/')
            .success(function(data) {
                console.log(data);
                console.log('view task');
                $scope.tasks = data;
            });
    };

    $scope.viewTask();

    $scope.createNewTask = function(task) {
        $state.go('createTask');
    };
      
    //use id in url $state.go with id

    $scope.viewDetailTaskId = function(id) {
        $http.get('http://localhost:4100/task/' + id)
            .success(function(data) {
                console.log(data);
                $scope.tasks = data;
                $state.go('viewTask', {
                    'id': id
                });
                //$scope.viewTask();
                $scope.tasks = data;
            });
    };

    $scope.createNewProject = function(project){
      $state.go('createProject');
    };

    $scope.projects = [];

    $scope.createProject = function(projects) {
        $http.post('http://localhost:4100/project/', projects)
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
                // $scope.tasks = data; 
                $state.go('home');
            });
    };

    $scope.reset = function() {
        $scope.task = [];
   };
})

.controller('viewTaskCtrl', function($scope, $http, $stateParams, $state) {
    $scope.task = {};

    var id = $stateParams.id;

    $http.get('http://localhost:4100/task/' + id).then(function(resp){
      console.log('Success', resp);
      $scope.task = resp.data;
    }, function(err){
      console.error('ERR', err);
    })

    $scope.deleteTask = function(taskId) {
        $http.delete('http://localhost:4100/task/' + taskId)
        .success(function (data) {
            console.log('data', data);
            $state.go('home');
        });
    };
    $scope.closeViewTask = function(){
        $state.go('home');
    };
})

.controller('ProjectCtrl', function($scope, $http, $stateParams, $state) {
    var id = $stateParams.id;
    $scope.projects = [];

    $scope.createProject = function(projects) {
        $http.post('http://localhost:4100/project/', projects)
            .success(function(data) {
                console.log(data);
                $state.go('home');
                
            });
    };
    $scope.cancel = function() {
        $scope.project = [];
    };
})

