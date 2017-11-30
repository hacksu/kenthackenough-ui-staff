angular
.module('khe')
.factory('Sponsors', ['$http', 'socketFactory', 'User', function ($http, socket, User) {

    var Sponsors = function() {

        var self = this;
        
        self.list = function() {
            console.log('req spons');
            var req = {
                method: 'GET',
                url: config.api + '/sponsors'
            };
            return $http(req);
        };

    };

    return Sponsors;

}]);