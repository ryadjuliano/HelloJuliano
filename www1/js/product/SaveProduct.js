'use strict';

app.factory('SaveProduct', function($http, $location, $ionicLoading){
	//$scope.msgtxt='';
	return{
		save:function(pr){

			  var $promise = $http.post("http://192.168.1.106/APIMOBILE/index.php?crud=simpan",{'namabarang': pr.namabarang, 'kategori': pr.kategori, 'harga': pr.harga, 'berat': pr.berat, 'kondisi': pr.kondisi});
	    		  $promise.success(function(data){
	    		  $ionicLoading.hide();
	    		  var sss = data.STATUS;
	    		  console.log(sss);
	              //$scope.message = data.STATUS; 
		    
        });

		},
		update:function(loginData){
			sessionService.clear('loginData');
			$location.path('/main');
		},
		delete:function(loginData){
			sessionService.get('loginData');
		}
	}
});
