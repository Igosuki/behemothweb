function RootCtrl($rootScope, $scope, $route, $routeParams, $location) {

    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;

    $scope.publicContent = [];
    $scope.restrictedContent = [];

}