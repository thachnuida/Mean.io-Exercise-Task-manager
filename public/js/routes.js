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

      .state('create', {
        url: '/create',
        resolve : {
          bookId:  function($stateParams){
            return $stateParams.id;
          },
        },
        controller: 'CreateBoardCtrl',
        templateUrl: 'views/createtask.html'
      })
      
      .state('view', {
        url: '/view',
        controller: 'CreateBoardCtrl',
        templateUrl: 'views/viewtask.html'
      });
}
]);
