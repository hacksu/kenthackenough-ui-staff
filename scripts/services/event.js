angular
  .module('khe')
  .factory('Event', ['$http', 'User', function ($http,User) {

    var Event = function () {

      var user = new User();

      /**
      * Add an event
      * @param event An event object (see API docs)
      * @return An $http promise
      */
      this.create = function (event) {
        var req = user.authorize({
          method: 'POST',
          url: config.api + '/events',
          data: event
        });
        return $http(req);
      };

      /**
      * Get a list of events
      * @return An $http promise
      */
      this.list = function () {
        var req = user.authorize({
          method: 'GET',
          url: config.api + '/events'
        });
        return $http(req);
      };

      /**
      * Delete a event
      * @param id The event ID
      * @return An $http promise
      */
      this.delete = function (id) {
        var req = user.authorize({
          method: 'DELETE',
          url: config.api + '/events/' + id
        });
        return $http(req);
      };
  };
  return Event;
}]);