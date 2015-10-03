openFB.init({appId: '589247784541614'});
var app = angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova'])
//angular.module('todo', ['ionic','ngCordova'])

.run(function($ionicPlatform, $location, LoginService, $state, $cordovaPush, $timeout,$rootScope, $cordovaSplashscreen,$cordovaNetwork) {
  
 
  /*$ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)

    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);


    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }

  });

  document.addEventListener("deviceready", function () {

    var type = $cordovaNetwork.getNetwork()

    var isOnline = $cordovaNetwork.isOnline()

    var isOffline = $cordovaNetwork.isOffline()


    // listen for Online event
    $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
      var onlineState = networkState;
      alert(onlineState);
    })

    // listen for Offline event
    $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
      var offlineState = networkState;
      alert(offlineState);
    })

  }, false);*/

  $ionicPlatform.ready(function() {
  

    navigator.splashscreen.hide();
    //PUT IN PUSH
    if(ionic.Platform.isWebView()) {
         

        var androidConfig = {
            "senderID":"380927257065",
        };
         
        androidConfig.ecb = "window.onNotification"
         
        window.onNotification = function(e) {
          switch( e.event )
          {
              case 'registered':
                  if ( e.regid.length > 0 )
                  {
                      //DEVICE REGISTRATION ID
                      //alert(e.regid);
                      window.localStorage.setItem("regid_gcmstorage", e.regid);
                      //document.getElementById("putgcm").innerHTML=e.regid;

                  }
                  break;
 
              case 'message':
                  alert(e.message);
                   
                  //We send an angular broadcast notification
                  var elem = angular.element(document.querySelector('[ng-app]'));
                  var rootScope = elem.injector().get('$rootScope');
                  rootScope.$broadcast('pushNotificationReceived', e);
                  break;
 
              case 'error':
                  alert(e.msg);
                  break;
 
              default:
                    alert('unknown');
                  break;
          }
        };
         
        //DEVICE REGISTER
        $cordovaPush.register(androidConfig).then(function(result) {
            //alert(result);
            //document.getElementById("putgcm").innerHTML=result;
          }, function(err) {
              alert(err);
          });
           
        $rootScope.$on('pushNotificationReceived', function(event, notification) {
            //WE RECEIVE THE BROADCAST
              //alert("received");
          });
    }
  });
   
    /*var nama = localStorage.getItem('log');
    var st = localStorage.getItem('status');
    var IDG = localStorage.getItem('ID');*/
    //alert(IDG);
    //var myObj = JSON.parse(window.localStorage.get("saved"));
    if(window.localStorage['status'] === 'SUCCESS')
    {
      $location.path('/tab/dash');
    }
    else
    {
      $location.path('/LoginAuth');
    }
    /*if(status  == 'SUCCESS')
    {
      //alert('suc')
      alert(status);
      return $state.go('tab.dash');
    }
    else
    {
      //alert('gal');
      return $state.go('LoginAuth');
    }*/

    //localStorage.removeItem('log');
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
 

  // setup an abstract state for the tabs directive
  $stateProvider
   .state('tab', {
    url: '/tab',
    templateUrl: 'templates/tabs.html'
    })  

   .state('LoginAuth', {
    url: '/LoginAuth',
    templateUrl: 'templates/auth/login.html',
    controller: 'LoginCtrl'
  })
   .state('signup', {
    url: '/signup',
    templateUrl: 'templates/auth/registrasi.html',
    controller: 'RegCtrl'
  })
  /*
  .state('login', {
    url: '/login',
    abstract: true,
    templateUrl: 'templates/auth/tab-login.html'
  })

  .state('tab', {
    url: '/tab',
    templateUrl: 'templates/tabs.html'
  })*/

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.dash-detail', {
    url: '/dash/:chatId/:countId',
    views: {
      'tab-dash': {
        templateUrl: 'templates/dash-detail.html',
        controller: 'DashDetailCtrl'
      }
    }
  })
  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })

  .state('tab.message', {
      url: '/message',
      views: {
        'tab-message': {
          templateUrl: 'templates/tab-message.html',
          controller: 'MsgCtrl'
        }
      }
    })

  .state('tab.polling', {
      url: '/polling',
      views: {
        'tab-polling': {
          templateUrl: 'templates/tab-polling.html',
          controller: 'PollingCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/LoginAuth');

});
