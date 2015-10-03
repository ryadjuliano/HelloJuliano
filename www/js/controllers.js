angular.module('starter.controllers', ['ngCordova','chart.js'])

.controller('DashCtrl', function($scope, $ionicLoading, $timeout,$http) {
  
    $ionicLoading.show({
          content: 'Loading',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0
          });
        $timeout(function() {
          $scope.doRefresh = function() {
              $http.get('http://103.224.165.232:8080/ipc-convert/complain/apps/get_public_complain.php')
             .success(function(data) {
               $scope.ask = data.comment;
             })
             .finally(function() {
               // Stop the ion-refresher from spinning
               $scope.$broadcast('scroll.refreshComplete');
             });
          };
          var xhr = $http.post("http://103.224.165.232:8080/ipc-convert/complain/apps/get_public_complain.php",{'limit': 1, 'page': 5, 'start':1});
          xhr.success(function(data){
          $scope.ask = data.comment;
          $ionicLoading.hide();
          })

          $scope.showmore = function(){
            console.log('datamore');
          }

      }, 4000);


})

.controller('LoginCtrl', function($scope,LoginService,$state) {
    $scope.doLogin = function(loginData) {
      LoginService.login(loginData);
    };
    $scope.fbLogin = function() {
    openFB.login(
        function(response) {
            if (response.status === 'connected') {
                console.log('Facebook login succeeded');
                alert('Login Facebook Berhasil Gann!!!!!!!!!');

                //return $state.go('tab.dash');
                LoginService.getInfo();
                //$scope.closeLogin();
            } else {
                alert('Facebook login failed');
            }
        },
        {scope: 'email,publish_actions'});
    }

})

.controller('RegCtrl', function($scope,$state,$http) {
    $scope.doReg = function(regData){
      var $promise = $http.post("http://103.224.165.232:8080/ipc-convert/complain/apps/apps_register.php?crud=register",{'regfieldemail': regData.email, 'fieldnamadepan': regData.firstname,'fieldnamabelakang': regData.lastname, 'regfieldpassword': regData.password });
        $promise.success(function(msg){
          var status = msg.regis.STATUS;
              
              if(status  === 'SUCCESS')
              {
                alert('Regsiter Success');
                return $state.go('LoginAuth');
                
              }
              else if(status==='ERROR')
              {
                 //$location.path('/app/register');
                  //$ionicLoading.hide();
                    alert('Error'); 
              }
              
        });
    }
})

.controller('ChatsCtrl', function($scope, $stateParams , $cordovaCamera, $cordovaFile, $timeout, $ionicLoading, $http, $state) {
    
    var xhr = $http.post("http://103.224.165.232:8080/ipc-convert/complain/apps/department.php");
            xhr.success(function(data){
            $scope.dept = data.departement;
          })

    $scope.takePicture = function(fromGallery){
    var options = {
      destinationType: (fromGallery ? Camera.DestinationType.FILE_URI : Camera.DestinationType.DATA_URL),
      sourceType: (fromGallery ? Camera.PictureSourceType.PHOTOLIBRARY : Camera.PictureSourceType.CAMERA),
      encodingType: Camera.EncodingType.JPEG,
      saveToPhotoAlbum: (fromGallery ? false : true),
      correctOrientation: true
    };
    
    if (!fromGallery){
      quality: 50,
      options.targetWidth =  300,
      options.targetHeight = 400
    }

    $cordovaCamera.getPicture(options).then(function(imageData) {
      /*
      if (fromGallery){
        $scope.pageInfo.imageType = 'URI';
      } else {
        $scope.pageInfo.imageType = 'DATA';
      }
      $scope.pageInfo.image = (fromGallery ? "" : "data:image/jpeg;base64,") + imageData;*/
      //$scope.imgURI = "data:image/jpeg;base64," + imageData;
      $scope.imgURI  = (fromGallery ? "" : "data:image/jpeg;base64,") + imageData;
    },function(err) {
    });
  }
  
  
  
 $scope.doUpload = function(formdata) {


        document.addEventListener('deviceready', function () {

                         
                        var subject = formdata.posting;
                        var options = new FileUploadOptions();
                        options.fileKey="file";
                      //options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
                      options.fileName=''+subject+'.jpg';
                      options.mimeType="image/jpeg";

                      var params = {};
                      params.idguest = localStorage.getItem('ID');
                      params.id_dept = formdata.dept;
                      params.isi_complain = formdata.posting;
                      params.notifikasi = '1';
                      options.params = params;
                

                     var ft = new FileTransfer();
                     ft.upload($scope.imgURI, encodeURI("http://103.224.165.232:8080/ipc-convert/complain/apps/uploads.php"), onUploadSuccess, onUploadFail, options);
                        function onUploadSuccess(msg)
                        {
                          //alert('image URI berhasil '+$scope.imgURI);
                          alert('Your Report Have been Sent');
                          return $state.go('tab.dash');
                        }
                        function onUploadFail()
                        {
                          alert('Error');
                        }
                    
                    });

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system

     /*Remote.api(params, '', 'post').then(function(data){
        $ionicLoading.hide();
        $sessionStorage.newQuestion = $scope.pageInfo;
        $scope.pageInfo = {
          subjects: [],
          topics:[],
          subject_id: 0,
          topic_id: 0,
          title: '',
          image: '',
          question:'',
          fields_error:{
            subject: false,
            image: false,
            title: false,
            question: false
          }
        };
        
        $location.path('/app/myquestion');
      }, 

      function(e){
        $ionicLoading.hide();
        Statics.goError("Failed to submit the question, please ensure you have working internet connection");
      });*/
  };
})

.controller('MsgCtrl', function($scope,$http,$ionicLoading,$timeout){
    $ionicLoading.show({
          content: 'Loading',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0
          });
        $timeout(function() {
          $ionicLoading.hide();
          
          var xhr = $http.post("http://103.224.165.232:8080/ipc-convert/complain/apps/getpesan.php");
          xhr.success(function(data){
          $scope.psn = data.pesan;
          
        })
      }, 1000);
})
.controller('DashDetailCtrl', function($scope, $stateParams, $state,$http) {
    var kon = $stateParams.chatId;
    var a = $stateParams.countId;
    //console.log(a);
    if(kon == 0)
    {
        alert('Feed Back Not Found');
        return $state.go('tab.dash');

    }
    else
    {
        //alert('correct');
        var xhr = $http.post("http://103.224.165.232:8080/ipc-convert/complain/apps/detilcomplain.php",{'idaduan': $stateParams.countId});
          xhr.success(function(data){
          $scope.cmp = data.complain;
          //console.log($scope.cmp);
        })
    }



})


.controller('AccountCtrl', function($scope,LoginService,$ionicLoading,$http,$timeout,$stateParams,$cordovaCamera, $cordovaFile) {

  //var IDG = '115';//localStorage.getItem('ID');
  $scope.takePicture = function(fromGallery){
    var options = {
      destinationType: (fromGallery ? Camera.DestinationType.FILE_URI : Camera.DestinationType.DATA_URL),
      sourceType: (fromGallery ? Camera.PictureSourceType.PHOTOLIBRARY : Camera.PictureSourceType.CAMERA),
      encodingType: Camera.EncodingType.JPEG,
      saveToPhotoAlbum: (fromGallery ? false : true),
      correctOrientation: true
    };
    
    if (!fromGallery){
      quality: 50,
      options.targetWidth =  300,
      options.targetHeight = 400
    }

    $cordovaCamera.getPicture(options).then(function(imageData) {
      /*
      if (fromGallery){
        $scope.pageInfo.imageType = 'URI';
      } else {
        $scope.pageInfo.imageType = 'DATA';
      }
      $scope.pageInfo.image = (fromGallery ? "" : "data:image/jpeg;base64,") + imageData;*/
      //$scope.imgURI = "data:image/jpeg;base64," + imageData;
      $scope.imgURI  = (fromGallery ? "" : "data:image/jpeg;base64,") + imageData;
    },function(err) {
    });
  }

  $scope.updateProf = function(prof){
      var pwd = prof.newpassword;
      if(pwd == undefined)
      {
          var password = prof.oldpassword;
      }
      else
      {
          var password = prof.newpassword;

      }
      console.log(password);
      var $promise = $http.post("http://103.224.165.232:8080/ipc-convert/complain/apps/updateprofiledata.php?kode=dua",{'email': prof.email, 'namad': prof.firstname,'namab': prof.lastname,'password': password,'idguest': localStorage.getItem('ID')});
        $promise.success(function(msg){
          var status = msg.users.STATUS;
              if(status  === 'SUCCESS')
              {
                alert('Update Success');
              }
              else if(status==='ERROR')
              {
                    alert('Update Fail'); 
              }
              
        });
    }
  //alert(IDG);
  $ionicLoading.show({
          content: 'Loading',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0
          });
        $timeout(function() {
          
          var idguest = localStorage.getItem('ID');
          var xhr = $http.post("http://103.224.165.232:8080/ipc-convert/complain/apps/detailprofile.php",{'idguest': localStorage.getItem('ID')});
          xhr.success(function(data){
          $scope.prof = data.profil;
          $ionicLoading.hide();
          //console.log($scope.prof)
        })
      }, 2000);


  $scope.signout = function(loginData) {
      LoginService.logout(loginData);
    }

})
.controller('PollingCtrl', function($scope,$http, $ionicModal) {
  
    $scope.uploadData = {choose:''};

    var xhr = $http.post("http://103.224.165.232:8080/ipc-convert/complain/apps/c_grafik.php");
          xhr.success(function(msg){
          $scope.poll = msg.polling[0];
          //$scope.labels = data.polling.judul;
          //console.log($scope.poll.DATA_POLL.kondisia);
          //console.log($scope.poll.DATA_PERSEN.persenOpsi1);
          //console.log($scope.poll.judul);
          $scope.labels = [$scope.poll.DATA_POLL.kondisia, $scope.poll.DATA_POLL.kondisib, $scope.poll.DATA_POLL.kondisic, $scope.poll.DATA_POLL.kondisid];
          $scope.series = [$scope.poll.judul];
          $scope.data = [
          [$scope.poll.DATA_PERSEN.persenOpsi1, $scope.poll.DATA_PERSEN.persenOpsi2, $scope.poll.DATA_PERSEN.persenOpsi3, $scope.poll.DATA_PERSEN.persenOpsi4]
          ];
        })

    $ionicModal.fromTemplateUrl('templates/vote.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modal = modal;
      });

    $scope.getpop = function(){
        $scope.modal.show();
        var xhr = $http.post("http://103.224.165.232:8080/ipc-convert/complain/apps/c_pooltext.php");
          xhr.success(function(msg){
          $scope.plo = msg.pooltext;
        })
    },
    $scope.doVote = function(uploadData){
      idguest = localStorage.getItem('ID');
      //alert(idguest);
      var sb = $scope.uploadData.choose;
      if(sb === "Sangat Baik")
      {
        kondisi = "sangatBaik";
      }
      else if(sb === "Baik")
      {
        var kondisi = "baik";
      }
      else if(sb === "Kurang Baik")
      {
        var kondisi = "kurangBaik";
      }
      else if(sb === "Tidak Baik")
      {
        var kondisi = "tidakBaik";
      }

        var $promise = $http.post("http://103.224.165.232:8080/ipc-convert/complain/apps/c_vote.php?crud=vote",{'id_gueststorage': localStorage.getItem('ID'),'kondisi': kondisi });
        $promise.success(function(data){
          var st = data.vote[0];
          alert(st.STATUS);
          //console.log(data.vote[0]);            
        });
      console.log('Choose',$scope.uploadData.choose);
      
    },
    $scope.closeQuestion = function(){
      $scope.modal.hide();
    }
});

//Manually imported the angular-chart.js library because no CDN hosted it.
!function(t){"use strict";"function"==typeof define&&define.amd?define(["angular","chart.js"],t):"object"==typeof exports?module.exports=t(require("angular"),require("chart.js")):t(angular,Chart)}(function(t,e){"use strict";function n(){var n={},r={Chart:e,getOptions:function(e){var r=e&&n[e]||{};return t.extend({},n,r)}};this.setOptions=function(e,r){return r?(n[e]=t.extend(n[e]||{},r),void 0):(r=e,n=t.extend(n,r),void 0)},this.$get=function(){return r}}function r(n){function r(t,e){return t&&e&&t.length&&e.length?Array.isArray(t[0])?t.length===e.length&&t[0].length===e[0].length:e.reduce(a,0)>0?t.length===e.length:!1:!1}function a(t,e){return t+e}function o(e,r,a){if(r.data&&r.data.length){r.getColour="function"==typeof r.getColour?r.getColour:l,r.colours=c(e,r);var o=a[0],u=o.getContext("2d"),s=Array.isArray(r.data[0])?g(r.labels,r.data,r.series||[],r.colours):p(r.labels,r.data,r.colours),f=t.extend({},n.getOptions(e),r.options),h=new n.Chart(u)[e](s,f);return r.$emit("create",h),["hover","click"].forEach(function(t){r[t]&&(o["click"===t?"onclick":"onmousemove"]=i(r,h,t))}),r.legend&&"false"!==r.legend&&v(a,h),h}}function i(t,e,n){return function(r){var a=e.getPointsAtEvent||e.getBarsAtEvent||e.getSegmentsAtEvent;if(a){var o=a.call(e,r);t[n](o,r),t.$apply()}}}function c(r,a){for(var o=t.copy(a.colours||n.getOptions(r).colours||e.defaults.global.colours);o.length<a.data.length;)o.push(a.getColour());return o.map(u)}function u(t){return"object"==typeof t&&null!==t?t:"string"==typeof t&&"#"===t[0]?s(d(t.substr(1))):l()}function l(){var t=[f(0,255),f(0,255),f(0,255)];return s(t)}function s(t){return{fillColor:h(t,.2),strokeColor:h(t,1),pointColor:h(t,1),pointStrokeColor:"#fff",pointHighlightFill:"#fff",pointHighlightStroke:h(t,.8)}}function f(t,e){return Math.floor(Math.random()*(e-t+1))+t}function h(t,e){return"rgba("+t.concat(e).join(",")+")"}function d(t){var e=parseInt(t,16),n=e>>16&255,r=e>>8&255,a=255&e;return[n,r,a]}function g(e,n,r,a){return{labels:e,datasets:n.map(function(e,n){var o=t.copy(a[n]);return o.label=r[n],o.data=e,o})}}function p(t,e,n){return t.map(function(t,r){return{label:t,value:e[r],color:n[r].strokeColor,highlight:n[r].pointHighlightStroke}})}function v(t,e){var n=t.parent(),r=n.find("chart-legend"),a="<chart-legend>"+e.generateLegend()+"</chart-legend>";r.length?r.replaceWith(a):n.append(a)}function y(t,e,n){Array.isArray(n.data[0])?t.datasets.forEach(function(t,n){(t.points||t.bars).forEach(function(t,r){t.value=e[n][r]})}):t.segments.forEach(function(t,n){t.value=e[n]}),t.update(),n.$emit("update",t)}function C(t){return!t||Array.isArray(t)&&!t.length||"object"==typeof t&&!Object.keys(t).length}return function(e){return{restrict:"CA",scope:{data:"=",labels:"=",options:"=",series:"=",colours:"=?",getColour:"=?",chartType:"=",legend:"@",click:"=",hover:"="},link:function(n,a){function i(r,i){if(!C(r)&&!t.equals(r,i)){var u=e||n.chartType;u&&(c&&c.destroy(),c=o(u,n,a))}}var c,u=document.createElement("div");u.className="chart-container",a.replaceWith(u),u.appendChild(a[0]),"object"==typeof window.G_vmlCanvasManager&&null!==window.G_vmlCanvasManager&&"function"==typeof window.G_vmlCanvasManager.initElement&&window.G_vmlCanvasManager.initElement(a[0]),n.$watch("data",function(t,i){if(t&&t.length&&(!Array.isArray(t[0])||t[0].length)){var u=e||n.chartType;if(u){if(c){if(r(t,i))return y(c,t,n);c.destroy()}c=o(u,n,a)}}},!0),n.$watch("series",i,!0),n.$watch("labels",i,!0),n.$watch("options",i,!0),n.$watch("colours",i,!0),n.$watch("chartType",function(e,r){C(e)||t.equals(e,r)||(c&&c.destroy(),c=o(e,n,a))}),n.$on("$destroy",function(){c&&c.destroy()})}}}}e.defaults.global.responsive=!0,e.defaults.global.multiTooltipTemplate="<%if (datasetLabel){%><%=datasetLabel%>: <%}%><%= value %>",e.defaults.global.colours=["#97BBCD","#DCDCDC","#F7464A","#46BFBD","#FDB45C","#949FB1","#4D5360"],t.module("chart.js",[]).provider("ChartJs",n).factory("ChartJsFactory",["ChartJs",r]).directive("chartBase",["ChartJsFactory",function(t){return new t}]).directive("chartLine",["ChartJsFactory",function(t){return new t("Line")}]).directive("chartBar",["ChartJsFactory",function(t){return new t("Bar")}]).directive("chartRadar",["ChartJsFactory",function(t){return new t("Radar")}]).directive("chartDoughnut",["ChartJsFactory",function(t){return new t("Doughnut")}]).directive("chartPie",["ChartJsFactory",function(t){return new t("Pie")}]).directive("chartPolarArea",["ChartJsFactory",function(t){return new t("PolarArea")}])});
//# sourceMappingURL=angular-chart.min.js.map

