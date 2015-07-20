<!DOCTYPE html>
<html lang="en">
  <head>
    <link rel="stylesheet" href="./libs/bootstrap-css-only/css/bootstrap.min.css" />
    <script type="text/javascript" src="./libs/angular/angular.min.js"></script>
    <script type="text/javascript" src="./libs/angular-resource/angular-resource.min.js"></script>
    <script type="text/javascript" src="./libs/angular-spring-data-rest/dist/angular-spring-data-rest.min.js"></script>
    <script type="text/javascript" src="./libs/lodash/lodash.min.js"></script>
    <script type="text/javascript" src="./app/app.js"></script>
    <script type="text/javascript" src="./app/controllers.js"></script>
    <script type="text/javascript" src="./app/services.js"></script>
  </head>
  
  <body ng-app="secretFriend">
    <div class="container" ng-controller="AppController">
      <div class="page-header">
        <h1>Secret Friend</h1>
      </div>
      <div class="alert alert-info" role="alert" ng-hide="persons && persons.length > 0">
        There are no persons in the list yet.
      </div>
      <form name="secretFriendForm" class="form-horizontal" role="form" ng-submit="addPerson(newPerson.name, newPerson.email)">
        <div class="form-group" ng-repeat="person in persons">
          <div class="checkbox col-xs-5">
            <label>
              {{person.name}}
            </label>
          </div>
          <div class="checkbox col-xs-4">
            <label>
              {{person.email}}
            </label>
          </div>
          <div class="col-xs-3">
            <button class="pull-right btn btn-danger" type="button" title="Delete"
              ng-click="deletePerson(person)">
              <span class="glyphicon glyphicon-trash"></span>
            </button>
          </div>
        </div>
        <hr />
        <div class="input">
          <div class="col-xs-4">
            <input type="text" name="userName" class="form-control" ng-model="newPerson.name" placeholder="Enter name ..." required />
          </div>
          <div class="col-xs-1"></div>
          <div class="col-xs-4">
	          <input type="email" name="userEmail" class="form-control" ng-model="newPerson.email" placeholder="Enter email ..." required />
	      </div>
	      <div class="col-xs-3"> 
	          <span class="input-group-btn">
	            <button class="btn btn-default" type="submit" ng-disabled="!secretFriendForm.$valid" title="Add">
	              <span class="glyphicon glyphicon-plus"></span>
	            </button>
	          </span>
	      </div>
        </div>
      </form>
    </div>
  </body>
  
</html>