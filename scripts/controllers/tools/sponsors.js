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
      //sponsors: new Sponsors
    };

    /**
    * Logged in user
    */
    view.me = Models.user.getMe();
    
}]);