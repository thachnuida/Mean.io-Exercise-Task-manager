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
        controller: '',
        templateUrl: 'views/main.html'
      })

      .state('createTask', {
        url: '/createtask',
        resolve : {
          bookId:  function($stateParams){
            return $stateParams.id;
          },
        },
        controller: 'CreateBoardCtrl',
        templateUrl: 'views/createtask.html'
      })

      .state('createProject', {
        url: '/createproject',
        resolve : {
          bookId:  function($stateParams){
            return $stateParams.id;
          },
        },
        controller: 'CreateBoardCtrl',
        templateUrl: 'views/createproject.html'
      })
      
      
      .state('view', {
        url: '/view',
        controller: 'CreateBoardCtrl',
        templateUrl: 'views/viewtask.html'
      });
}
]);
