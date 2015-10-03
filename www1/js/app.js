openFB.init({appId: '589247784541614'});
var app = angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova'])

app.run(function($ionicPlatform, $location, LoginService, $cordovaFile) {

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    //var aa = Logis.getItem("loginData");
    //var aa = LoginService.isLogged('loginData');
    var aa = localStorage.getItem("loginData");
    //alert(aa);
    if(aa)
    {
      //$location.path('/main');
      //alert('Storage Tidak Ada');
      $location.path('/snd/home');
    }
    else
    {
      alert('Storage Habess');
      //$location.path('/main');
      $location.path('/snd/home');
    }

  });
  
})

app.config(function($stateProvider, $urlRouterProvider) {
// untuk start page pertama kalo di mobile
  $stateProvider
  .state('intro', {
    url: '/',
    templateUrl: 'templates/startpage/intro.html',
    controller: 'IntroCtrl'
  })

 .state('LoginAuth', {
    url: '/LoginAuth',
    templateUrl: 'templates/auth/login.html',
    controller: 'LoginAuthCtrl'
  })


        .state('snd', {
                url : '/snd',
                templateUrl : 'templates/menu.html',
                abstract : true,
                controller : 'SndController'
            })

            .state('snd.home', {
                url: '/home',
                views: {
                    'snd': {
                        templateUrl: 'templates/dashboard/home.html',
                        controller : 'SndHomePageController'
                    }
                }
            })
            .state('snd.product', {
                url: '/product',
                views: {
                    'snd': {
                        templateUrl: 'templates/dashboard/product.html',
                        controller : 'SndProductCtrl'
                    }
                }
            })
            .state('snd.profile', {
                url: '/profile',
                views: {
                    'snd': {
                        templateUrl: 'templates/auth/profile.html',
                        controller : 'ProfileCtrl'
                    }
                }
            })

  .state('main', {
    url: '/main',
    templateUrl: 'templates/startpage/start.html',
    controller: 'MainCtrl'
  });
  $urlRouterProvider.otherwise("/");
});
