(function(angular) {
  var HATEOAS_URL = './api/persons';
  var PersonFactory = function($http, SpringDataRestAdapter) {
    function Person(person) {
      
      if (person._resources) {
        person.resources = person._resources("self", {}, {
          update: {
            method: 'PUT'
          }
        });
        person.save = function(callback) {
          person.resources.update(person, function() {
            callback && callback(person);
          });
        };
        
        person.remove = function(callback) {
          $http.get('./clearShuffle').
        	  success(function(data, status, headers, config) {
        	  }).
        	  error(function(data, status, headers, config) {
        	  });
          person.resources.remove(function() {
            callback && callback(person);
          });
        };
      } else {
        person.save = function(callback) {
          Person.resources.save(person, function(person, headers) {
            var deferred = $http.get(headers().location);
            return SpringDataRestAdapter.process(deferred).then(function(newPerson) {
            	callback && callback(new Person(newPerson));
            });
          });
        };
      }

      return person;
    }
    
    Person.query = function(callback) {
      var deferred = $http.get(HATEOAS_URL);
      return SpringDataRestAdapter.process(deferred).then(function(data) {
        Person.resources = data._resources("self");
        callback && callback(_.map(data._embeddedItems, function(person) {
          return new Person(person);
        }));
      });
    };
    
    Person.resources = null;
    
    return Person;
  };
  
  PersonFactory.$inject = ['$http', 'SpringDataRestAdapter'];
  angular.module("secretFriendApp.services").factory("Person", PersonFactory);
}(angular));