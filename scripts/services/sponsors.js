angular
.module('khe')
.factory('Sponsors', ['$http', 'socketFactory', 'User', function ($http, socket, User) {

    var Sponsors = function() {

        var self = this;
        var user = new User();
        
        self.list = function() {
            var req = {
                method: 'GET',
                url: config.api + '/sponsors'
            };
            return $http(req);
        };

        self.addSponsor = function(newSpons) {
            var req = user.authorize({
                method: 'POST',
                url: config.api + '/tmp',
                data: newSpons
            });
            return $http(req);
        };

    };

    return Sponsors;

}]);