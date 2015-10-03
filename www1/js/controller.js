angular.module('starter.controllers', ['ngCordova'])

.controller('NavController', function($scope, $ionicSideMenuDelegate) {
      $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
       //alert('nav');
      };
})

.controller('IntroCtrl', function($scope, $state, $ionicSlideBoxDelegate) {
 
  // Called to navigate to the main app
  $scope.startApp = function() {
    $state.go('main');
  };
  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };
})

.controller('DashboardCtrl', function($scope, $state){
  console.log('DashboardCtrl');

})
.controller('SndController', function($scope, $ionicSideMenuDelegate) {

})

.controller('SndHomePageController', function($scope, $ionicSideMenuDelegate, LoginService, $cordovaCamera, $cordovaFile) {

  var ss = window.localStorage.getItem("loginData");
  alert('Selamat Datang' +  ss);

  $scope.toLogout = function(loginData){
    LoginService.logout(loginData);
  };

  $scope.takePicture = function(){

    console.log('Camera run');
        var options = {
          quality: 50,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.CAMERA,
          allowEdit: true,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 300,
          targetHeight: 300,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: false
        };

    $cordovaCamera.getPicture(options).then(function(imageData) {
      $scope.imgURI = "data:image/jpeg;base64," + imageData;

    },function(err) {
      // error
    });


  },

  $scope.SimpanGambar = function(){

    console.log('Uploading Data ....');
    
    //console.log(usertoken);
    document.addEventListener('deviceready', function () {

       alert('Uploading Yes')
       var usertoken = localStorage.getItem('loginData');
       //var gambar = $scope.imgURI;
       alert(usertoken);


        var options = new FileUploadOptions();
        options.fileKey="file";
        //options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
        options.fileName=''+usertoken+'.jpg';
        options.mimeType="image/jpeg";

        var params = {};
        params.tokenuser =usertoken;
        
        options.params = params;

          var ft = new FileTransfer();
          ft.upload($scope.imgURI, encodeURI("http://192.168.0.18/APIMOBILE/index.php?crud=getupload"), onUploadSuccess, onUploadFail, options);

          //var ft = new FileTransfer();
          //ft.upload(gambar, encodeURI("http://192.168.1.103/APIMOBILE/upload_image.php"), onUploadSuccess, onUploadFail, options);
          function onUploadSuccess(msg)
          {
           // alert('Upload success');
            //var dum = msg.gmbr;
            alert(dum);
            alert('image URI berhasil '+$scope.imgURI);
          }
          function onUploadFail()
          {
            alert('Error');
          }
      });
  }

})

.controller('SndProductCtrl', function($scope,$ionicSideMenuDelegate, $ionicLoading, SaveProduct){
  console.log('Yeahhh!!!');
    //$scope.totest = alert('kd');

    $scope.toSave = function(pr){
    SaveProduct.save(pr);
     $ionicLoading.show({
          template: 'Loading...'
       });
    //var $promise = $http.post("http://localhost/APIMOBILE/index.php?crud=login",{'username': loginData.username, 'password': loginData.password});
      //SaveProduct.save(pr);
      /*
      $scope.namabarang = undefined;
      $scope.kategori = undefined;
      $scope.harga = undefined;
      $scope.berat = undefined;
      $scope.kondisi = undefined;
          $http({
            method : 'POST',
            url : 'http://localhost/APIMOBILE/index.php?crud=simpan',
            headers : {'Content-type': 'application/json'},
            data : JSON.stringify({namabarang: $scope.namabarang,kategori: $scope.kategori, harga: $scope.harga, berat: $scope.berat, kondisi: $scope.kondisi})
          })
          .success(function(data){
            console.log(data);
            var st = data.prod;
              //console.log(ss);
            //var aa = ss.STATUS;
            $scope.message = prod.status;
          });
      */
    }
      

})

.controller('FormCtrl', function($scope, $http){

     

})

.controller('MainCtrl', function($scope, $location) {
  console.log('MainCtrl');
  
  $scope.tolink = function(){
    //alert('oke');
    $location.path('/LoginAuth');
  }
  //alert('te');
  //$scope.toDashboard = function(){
    //  $state.go('snd.home');
    //}
})
.controller('LoginAuthCtrl', function($scope, $location, LoginService, $ionicLoading){

  console.log('login borwww');

  $scope.doLogin = function(loginData){
    //alert('login');
    //$location.path('snd/home');
    LoginService.login(loginData); //call Login Function
    $ionicLoading.show({
          template: 'Loading...'
       });
  };

  $scope.fbLogin = function() {
    openFB.login(
        function(response) {
            if (response.status === 'connected') {
                console.log('Facebook login succeeded');
                alert('Login Facebook Berhasil Gann!!!!!!!!!');
                $location.path('/snd/profile');
                $scope.closeLogin();
            } else {
                alert('Facebook login failed');
            }
        },
        {scope: 'email,publish_actions'});
}
})

.controller('ProfileCtrl', function($scope) {
    openFB.api({
        path: '/me',
        params: {fields: 'id,name'},
        success: function(user) {
            $scope.$apply(function() {
                $scope.user = user;
            });
        },
        error: function(error) {
            alert('Facebook error: ' + error.error_description);
        }
    });

    $scope.share = function(event) {
    openFB.api({
        method: 'POST',
        path: '/me/feed',
        params: {
            message: "I'll be attending: '" + $scope.session.title + "' by " +
                $scope.session.speaker
        },
        success: function () {
            alert('The session was shared on Facebook');
        },
        error: function () {
            alert('An error occurred while sharing this session on Facebook');
        }
    }); 
  };
});


