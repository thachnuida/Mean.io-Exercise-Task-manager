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
            controller: 'MainCtrl',
            templateUrl: 'views/main.html'
        })
        
        .state('viewProject',{
            url: '/viewproject/:id',
            controller: 'viewProjectCtrl',
            templateUrl: 'views/viewproject.html'
        })

        .state('createProject', {
            url: '/createproject',
            resolve: {
                projectId: function($stateParams) {
                return $stateParams.id;
                },
            },
            controller: 'ProjectCtrl',
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
        })

        .state('editTask', {
            url: '/edittask/:id',
            resolve: {
                taskId: function($stateParams) {
                    return $stateParams.id;
                },
            },
            controller: 'editTaskCtrl',
            templateUrl: 'views/edittask.html'
        })
    }
]);