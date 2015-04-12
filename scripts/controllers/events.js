angular
  .module('khe')
  .config(['$routeProvider', function ($router) {
    $router.when('/events', {
        templateUrl: '/views/events.html',
        controller: 'EventCtrl as ctrl'
      });
  }])
  .controller('EventCtrl', ['User', 'Event', function (User, Event) {

        /**
        * The template interface
        */
        var view = this;

        var Models = {
          user: new User(),
          event: new Event()
        };

        /**
        * Logged in user
        */
        view.me = Models.user.getMe();

        /**
        * An array of all events
        */
        view.events = [];

        /**
        * Populate the list of events
        */
        function get() {
          Models.event.list().
          success(function (data) {
            view.errors = null;
            view.events = data.events;
          }).
          error(function (data) {
            view.errors = data.errors || ['An internal error has occurred'];
          });
        }

        view.event = {

          /**
          * An object containing the new message
          */
          new: {},

          /**
          * create a new event
          */
          create: function () {
            var self = this;
            self.new.start.setHours(self.new.starthour.getHours());
            self.new.start.setMinutes(self.new.starthour.getMinutes());
            self.new.end.setHours(self.new.endhour.getHours());
            self.new.end.setMinutes(self.new.endhour.getMinutes());

            console.log(self.new);


            Models.event.create(self.new).
            success(function (data) {
              view.errors = null;
              //self.new = {};
              get();
            }).
            error(function (data) {
              view.errors = data.errors || ['An internal error had occurred'];
            });
          },

          /**
          * Delete a given event
          */
          delete: function (event) {
            Models.event.delete(event._id).
            success(function (data) {
              view.errors = null;
              get();
            }).
            error(function (data) {
              view.errors = data.errors || ['An internal error has occurred'];
            });
          }

        };

        /**
        * Initialize controller
        */
        console.log("testing");
        get();

}]);