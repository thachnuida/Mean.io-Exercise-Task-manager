'use strict';

//Setting up route
angular.module('taskboardApp').config(['$stateProvider', '$urlRouterProvider',

    function($stateProvider, $urlRouterProvider) {

        //console.log('pass--pass');
        // For unmatched routes:
        $urlRouterProvider.otherwise('/');

        // states for my app
        $stateProvider

        .state('home', {
            url: '/home',
            controller: 'TaskCtrl',
            templateUrl: 'views/main.html'
        })
        
        .state('viewProject',{
            url: '/viewproject/:id',
            controller: 'viewProjectCtrl',
            templateUrl: 'views/viewproject.html'
        })

        

        .state('createTask', {
            url: '/createtask',
            resolve: {
                taskId: function($stateParams) {
                    return $stateParams.id;
                },
            },
            controller: 'createTaskCtrl',
            templateUrl: 'views/createtask.html'
        })

        .state('createProject', {
            url: '/createproject',
            resolve: {
                projectId: function($stateParams) {
                return $stateParams.id;
                },
            },
            controller: 'ProjectCtrl',
            //templateUrl: 'views/main.html'
        })

        .state('viewTask', {
            url: '/viewtask/:id',
            resolve: {
                taskId: function($stateParams) {
                    return $stateParams.id;
                },
            },
            controller: 'viewTaskCtrl',
            templateUrl: 'views/viewtask.html'
        });

    }
]);