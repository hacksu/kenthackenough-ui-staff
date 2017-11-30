angular
.module('khe')
.config(['$routeProvider', function ($router) {
  $router.when('/tools/sponsors', {
    templateUrl: '/views/tools/sponsors.html',
    controller: 'SponsorCtrl as sponsor'
  });
}])
.controller('SponsorCtrl', ['User', 'Sponsors', function (User, Sponsors) {

    /**
    * Template interface
    */
    var view = this;
    
    var Models = {
      user: new User(),
      sponsors: new Sponsors()
    };

    /**
    * Logged in user
    */
    view.me = Models.user.getMe();

    view.sponsorList = [];
    view.selected = {};

    function add(newSponsor) {
      Models.sponsors.addSponsor(newSponsor);
    }

    view.remove = function(spons) {
      // remove by id
      console.log(spons._id);
    };

    function getSponsorList() {
      Models.sponsors.list()
        .success(function (data) {
          view.errors = null;
          view.sponsorList = data;
          console.log(data);
        })
        .error(function (data) {
          view.errors = data.errors || ['Unable to get sponsor list.'];
          throw data;
        });
    }

    /**
    * Initialize controller
    */
    getSponsorList();
    
}]);