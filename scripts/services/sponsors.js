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
                url: config.api + '/sponsors',
                data: newSpons
            });
            return $http(req);
        };

        self.update = function(spons) {
            var req = user.authorize({
                method: 'POST',
                url: config.api + '/sponsors/' + spons._id + '/update',
                data: spons
            });
            return $http(req);
        };

        self.remove = function(id) {
            var req = user.authorize({
                method: 'DELETE',
                url: config.api + '/sponsors/' + id
            });
            return $http(req);
        };

    };

    return Sponsors;

}]);