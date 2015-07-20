(function(angular) {
  var AppController = function($rootScope, $scope, $http, $location, Person, ngDialog) {
	  
    Person.query(function(response) {
      $scope.persons = response ? response : [];
    });
    
    $scope.addPerson = function(name, email) {
    
      var uniqueEmail = true;
      
      for (i=0; i<$scope.persons.length; i++) {
    	  if ($scope.persons[i].email == email) {
    		  uniqueEmail = false;
    		  break;
    	  }
      }
    
      if (uniqueEmail) {
	      var newPerson = new Person({
	        name: name,
	        email: email
	      }).save(function(person) {
	        $scope.persons.push(person);
	        $scope.openSuccessDialog("New Person added successfully !!!", "/");
	      });
		  $scope.newPerson = "";
      } else {
    	  $scope.openErrorDialog("This e-mail was already entered !");
      }
	  
    };
    
    $scope.updatePerson = function(person) {
      person.save();
      $location.path("/");
    };
    
    $scope.deletePerson = function(person) {
      person.remove(function() {
        $scope.persons.splice($scope.persons.indexOf(person), 1);
      });
      $rootScope.isShuffleDisabled = false;
      $location.path("/");
    };
    
    $scope.deleteSelectedPerson = function() {
    	person = $scope.personToDelete; 
        person.remove(function() {
          $scope.persons.splice($scope.persons.indexOf(person), 1);
        });
        ngDialog.closeAll();
      };
    
    $scope.openSuccessDialog = function (dialogMessage, redirectURL) {
    	$scope.dialogMessage = dialogMessage;
    	$scope.dialogMessageRedirectURL = redirectURL;
        ngDialog.open({ template: 'partials/modalContentSuccess.html', scope: $scope, showClose: false, className: 'ngdialog-theme-default'});
    };

    $scope.openDeleteConfirmationDialog = function (person) {
    	$scope.dialogMessage = "Really wish to delete this Person ?";
    	$scope.dialogMessageRealDeleteFunction = "deletePerson";
    	$scope.personToDelete = person;
        ngDialog.open({ template: 'partials/modalContentDeleteConfirmation.html', scope: $scope, showClose: false, className: 'ngdialog-theme-default'});
    };

    $scope.openSendEmailConfirmationDialog = function () {
    	$scope.dialogMessage = "Send all the e-mails now ?";
        ngDialog.open({ template: 'partials/modalContentSendEmailConfirmation.html', scope: $scope, showClose: false, className: 'ngdialog-theme-default'});
    };
    
    $scope.openErrorDialog = function (dialogMessage) {
    	$scope.dialogMessage = dialogMessage;
        ngDialog.open({ template: 'partials/modalContentError.html', scope: $scope, showClose: false, className: 'ngdialog-theme-default'});
    };
    
    $scope.closeDialog = function (redirectURL) {
        ngDialog.closeAll();
        if (redirectURL) $location.path($scope.dialogMessageRedirectURL);
    };

    $scope.doShuffle = function() {
        $http.get('./doShuffle').
  	  success(function(data, status, headers, config) {
  		$rootScope.isShuffleDisabled = true;
  		Person.query(function() { $location.path("/shuffleResult"); });
  	  }).
  	  error(function(data, status, headers, config) {
  	  });
    };
    
    $scope.sendEmails = function() {
        $http.get('./sendEmails').
  	  success(function(data, status, headers, config) {
  	  }).
  	  error(function(data, status, headers, config) {
  	  });
      ngDialog.closeAll();
    };
    
    $scope.searchResult = function(searchText) {
    	$rootScope.searchText = searchText;
    	$location.path("/searchResult");
    };

    $scope.updatePersonPage = function(person) {
    	$rootScope.personToUpdate = person;
    	$location.path("/updatePerson");
    };

    $scope.addNewPersonPage = function(person) {
    	$location.path("/addNewPerson");
    };

    $scope.backToHome = function() {
    	$rootScope.searchText = "";
    	$location.path("/");
    };
    
    
  };
  
  AppController.$inject = ['$rootScope', '$scope', '$http', '$location', 'Person', 'ngDialog'];
  angular.module("secretFriendApp.controllers").controller("AppController", AppController);
  
}(angular));