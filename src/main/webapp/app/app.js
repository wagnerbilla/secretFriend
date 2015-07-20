(function(angular) {
  'use strict';
	
  var secretFriendAppControllers = angular.module("secretFriendApp.controllers", ["ngDialog"]);
  var secretFriendAppServices =	angular.module("secretFriendApp.services", []);
  var secretFriendApp = angular.module('secretFriendApp', ["ngRoute","ngResource","spring-data-rest", "secretFriendApp.controllers", "secretFriendApp.services"]);
	
  secretFriendApp.config(['$routeProvider', '$locationProvider',
	  function($routeProvider, $locationProvider) {
	    $routeProvider.
	      when('/', {
	       templateUrl: 'partials/main.html',
	       controller: 'AppController'
	  }).when('/addNewPerson', {
		  templateUrl: 'partials/addNewPerson.html',
		  controller: 'AppController'
	  }).when('/updatePerson', {
		  templateUrl: 'partials/updatePerson.html',
		  controller: 'AppController'
	  }).when('/shuffleResult', {
		  templateUrl: 'partials/shuffleResult.html',
		  controller: 'AppController'
	  }).when('/searchResult', {
		  templateUrl: 'partials/searchResult.html',
		  controller: 'AppController'
	  });
	
  }]);

}(angular));
