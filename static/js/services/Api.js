myApp.factory('Api', ['$resource', function ($resource){
    return {
        User: $resource('/api/user/:id', {id: '@id'})
    }
}]);