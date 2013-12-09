angular.module('project', ['ngRoute', 'firebase'])
 
.value('fbURL', 'https://angularjs-projects.firebaseio.com/')
 
.factory('Projects', function(angularFireCollection, fbURL) {
  return angularFireCollection(fbURL);
})
 
.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      controller:'ListCtrl',
      templateUrl:'list.html'
    })
    .when('/edit/:projectId', {
      controller:'EditCtrl',
      templateUrl:'detail.html'
    })
    .when('/new', {
      controller:'CreateCtrl',
      templateUrl:'detail.html'
    })
    .otherwise({
      redirectTo:'/'
    });
})
 
.controller('ListCtrl', function($scope, Projects) {
  $scope.projects = Projects;
})
 
.controller('CreateCtrl', function($scope, $location, $timeout, Projects) {
  $scope.save = function() {
    Projects.add($scope.project, function() {
      $timeout(function() { $location.path('/'); });
    });
  };
})
 
.controller('EditCtrl',
  function($scope, $location, $routeParams, angularFire, fbURL) {
 
    var projectUrl = fbURL + $routeParams.projectId;
    var bindToProject = angularFire(projectUrl, $scope, 'remote', {});
 
    bindToProject.then(function() {
 
      $scope.project = angular.copy($scope.remote);
      $scope.project.$id = $routeParams.projectId;
 
      $scope.isClean = function() {
        return angular.equals($scope.remote, $scope.project);
      }
 
      $scope.destroy = function() {
        $scope.remote = null;
        $location.path('/');
      };
 
      $scope.save = function() {
        $scope.remote = angular.copy($scope.project);
        $location.path('/');
      };
    });
});
