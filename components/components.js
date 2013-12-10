angular.module('components', [])

  .directive('tabs', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {},
      controller: function($scope, $element) {
        var panes = $scope.panes = [];

        $scope.select = function(pane) {
          angular.forEach(panes, function(pane) {
            pane.selected = false
          });
          pane.selected = true;
        }

        this.addPane = function(pane) {
          if (panes.length == 0) $scope.select(pane);
          panes.push(pane);
        }
      },
      template:
      '<div class="tabbable">' +
        '<ul class="nav nav-tabs">' +
          '<li ng-repeat="pane in panes" ng-class="{active:pane.selected}">' +
            '<a href="" ng-click="select(pane)">{{pane.title}}</a>'
          '</li>' +
        '</ul>' +
      '</div>',
      replace: true,
    };
  })

  .directive('pane', function() {
    return {
      scope: { title: '@'},
      require: '^tabs', // Array = multiple requires, ? = optional, ^ = check parent elements
      restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
      transclude: true,
      link: function(scope, element, attrs, tabsCtrl) {
        tabsCtrl.addPane(scope);
      },
      template: 
          '<div class="tab-pane" ng-class="{active: selected}" ng-transclude>'
        +
          '</div>',
      replace: true,
    };
  })
