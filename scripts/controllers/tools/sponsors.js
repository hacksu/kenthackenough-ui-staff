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

    view.add = function(newSponsor) {
      Models.sponsors
      .addSponsor(newSponsor)
      .success(function(data) {
        getSponsorList();
      })
      .catch(function (err) {
        view.errors = err || ['Unable to add sponsor.'];
      });
    };

    view.update = function(spons) {
      Models.sponsors
      .update(spons)
      .success(function(data) {
        getSponsorList();
      })
      .catch(function(err) {
        view.errors = err || ['Unable to update sponsor.'];
      });
    };

    view.remove = function(spons) {
      // remove by id
      Models.sponsors.remove(spons._id)
      .success (function(data) {
        getSponsorList();
      })
      .catch(function (err) {
        view.errors = err || ['Unable to remove sponsor.'];
      });
    };

    view.addOrUpdate = function (spons) {
      console.log(spons)
      if (spons._id) {
        view.update(spons);
      } else {
        view.add(spons);
      }
      getSponsorList();
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