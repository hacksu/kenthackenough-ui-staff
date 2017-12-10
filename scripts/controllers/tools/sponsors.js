angular
.module('khe')
.config(['$routeProvider', function ($router) {
  $router.when('/tools/sponsors', {
    templateUrl: '/views/tools/sponsors.html',
    controller: 'SponsorCtrl as sponsor'
  });
}])
.controller('SponsorCtrl', ['User', 'Sponsors', 'Upload', function (User, Sponsors, Upload) {

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

    view.errors= [];
    view.sponsorList = [];
    view.selected = {};
    view.logoImg = {};

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
      if (spons._id) {
        view.update(spons);
      } else {
        view.add(spons);
      }
      view.selected = {};      
      getSponsorList();
    };

    view.uploadImg = function() {
      if (!view.logoImg.name) {
        console.log("No image chosen.");
        view.errors = ["No image chosen."];
        return;
      }
      
      if (!view.selected || !view.selected._id) {
        console.log("No sponsor selected");
        view.errors = ["No sponsor selected"];
        return;
      }
      view.errors = []
      
      var req = Models.user.authorize({});
      console.log(req);
      console.log(view.logoImg);
      req.data = { 
        file: view.logoImg,
        sponsor: view.selected
      };
      req.url = config.api + '/sponsors/' + view.selected._id + '/logo';
      console.log(req);

      Upload.upload(req)
      .then(function(data) {
        // Force image refresh.
        view.selected.logo = null
        view.getImgSrc(view.selected);
      }).catch(function(err){
        throw err;
      });
    };

    view.getImgSrc = function(item) {
      if (!item.logo)
      {
        // Add the time to force image refresh.
        item.logo = config.api + '/sponsors/' + item._id + '/logo?' + new Date().getTime();
      }
    };

    function getSponsorList() {
      Models.sponsors.list()
        .success(function (data) {
          view.errors = null;
          // Initalize logo paths
          data.forEach(element => {
            view.getImgSrc(element);
          });
          view.sponsorList = data;          
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