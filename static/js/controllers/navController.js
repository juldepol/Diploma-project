myApp.controller('navController', ['$scope', '$location', 'Api', function ($scope, $location, Api) {
    $scope.isActive = function (destination) {
        return destination === $location.path();
    };
    $scope.user;
    
    Api.User.query({}, function(data){
        $scope.user=data;
    });
}]);