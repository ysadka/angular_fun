function TodoCtrl($scope) {
//TodoCtrl is controller behind view
// $scope contains model data. glue btwn controller and view
  $scope.todos = [
  {text:'learn angular', done: true},
  {text:'build angular app', done: false}];

  $scope.addTodo = function() {
  // #addTodo is behavior invoked by ng-submit
    $scope.todos.push({text:$scope.todoText, done: false});
    // #push is unmodified and updates the model and subsequently the view. ng-repeat is bound to this array.
    $scope.todoText = '';
    //Data binding clears control
  };

  $scope.remaining = function() {
  //#remaining is computed property
    var count = 0;
    angular.forEach($scope.todos, function(todo){
      count += todo.done ? 0 : 1;
    });
    return count;
  };

  $scope.archive = function() {
    var oldTodos = $scope.todos;
    $scope.todos = [];
    angular.forEach(oldTodos, function(todo) {
      if (!todo.done) $scope.todos.push(todo);
    });
  };
}
