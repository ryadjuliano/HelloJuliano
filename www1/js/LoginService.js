'use strict';

app.factory('LoginService', function($http, $location, sessionService, $state, $ionicLoading){
	//$scope.msgtxt='';
	return{
		login:function(loginData,scope){

			//var username = loginData.username;
			//var $prom = $http.post('http://localhost/APIMOBILE/index.php', loginData,crud); old
			var $promise = $http.post("http://192.168.43.90/APIMOBILE/index.php?crud=login",{'username': loginData.username, 'password': loginData.password});
				$promise.success(function(msg){
			        var ss = msg.users;
			        //console.log(ss);
			        var aa = 'SUCCESS';
			        var us = ss.username;
			        console.log(aa);
		        //	console.log(username);

			        if(aa === 'SUCCESS')
			        {
			        	//console.log('Halaman Error');
			        	sessionService.set('loginData', us);
			            console.log('Success');
			            $ionicLoading.hide();
			            //return $state.go('app.home');
			            $location.path('/snd/home');

				        
			        }
			        else if(aa==='ERROR')
			        {
			        	 //$location.path('/app/register');
			        	 $ionicLoading.hide();
			            alert('Error'); 
			        }
			        
		    });
		   

		},
		logout:function(loginData){
			sessionService.clear('loginData');
			$location.path('/main');
		},
		isLogged:function(loginData){
			sessionService.get('loginData');
		}
	}
});
