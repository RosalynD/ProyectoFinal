'use strict';

  angular
    .module('core')
    .controller('HomeController', ['$scope' , 'Authentication',
      function($scope, Authentication) {

  //function HomeController() {
   // var vm = this;

    $scope.alerts = [
      {
        icon:'glyphicon-user',
        colour:'btn-success',
        total:'20,408',
        description:'TOTAL USERS',
      },
      {
        icon:'glyphicon-calendar',
        colour:'btn-primary',
        total:'8,954',
        description:'UPCOMING OFFERS',
      },
      {
        icon:'glyphicon-edit',
        colour:'btn-success',
        total:'554',
        description:'NEW USERS IN 24H',
      },
      {
        icon:'glyphicon-record',
        colour:'btn-info',
        total:'90,000',
        description:'EMAILS RECEIVED',
      },
      {
        icon:'glyphicon-eye-open',
        colour:'btn-warning',
        total:'311',
        description:'FOLLOW UPS REQUIRED',
      },
      {
        icon:'glyphicon-flag',
        colour:'btn-danger',
        total:'348',
        description:'PRODUCTS ISSUES',
      }
    ];
  }
 ]);

