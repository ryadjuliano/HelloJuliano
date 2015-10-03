'use strict';

app.factory('LoginService', function($http, $location, sessionService, $state, $ionicLoading){
	//$scope.msgtxt='';
	return{
		login:function(loginData){

			var $promise = $http.post("http://103.224.165.232:8080/ipc-convert/complain/apps/loginsubmit.php?crud=login",{'email': loginData.username, 'password': loginData.password});
				
				$promise.success(function(msg){

					var status = msg.users.STATUS;
					//console.log(status);
			        if(status  === 'SUCCESS')
			        {
			        	var log = msg.users.username;
			        	var stts = msg.users.STATUS;
			        	var idguest = msg.users.idguest;

			        	window.localStorage.setItem("status", stts);
			        	window.localStorage.setItem("log", log);
			        	window.localStorage.setItem('ID', idguest);

			        	//localStorage.setItem('status', stts);
			        	//localStorage.setItem('log', log);
			        	var idgcm = window.localStorage.getItem('regid_gcmstorage');
			        	
					        var $promise = $http.post("http://103.224.165.232:8080/ipc-convert/complain/apps/sendgcm.php",{'id_gueststorage': window.localStorage.getItem('ID'), 'regId': idgcm});
					        	$promise.success(function(getData){
									//id_gueststorage
									//alert('Tesimpan');
									//alert(idgcm);

					        });
			        	return $state.go('tab.dash');
			        	
			        }
			        else if(status==='ERROR')
			        {
			        	 //$location.path('/app/register');
			        	 	//$ionicLoading.hide();
			            	alert('Username or Password Wrong !!!'); 
			        }
			        
		    });
		   

		},
		logout:function(loginData){
			//sessionService.clear('loginData');
			window.localStorage.removeItem("status");
        	window.localStorage.removeItem("log");
        	window.localStorage.removeItem("ID");
        	return $state.go('LoginAuth'); 
		},
		isLogged:function(loginData){
			if(window.localStorage.getItem("status") !== undefined && window.localStorage.getItem("log") !== undefined) {
            	return true;
	        } else {
	            return false;
	        }
		},
		getInfo:function() {
				 openFB.api({
			        path: '/me',
			        params: {fields: 'id,name'}
			    	}).then(
			        	function(user) {
			            	//$scope.user = user;
			            	alert(user);
			        },
			        	function (error) {
			            alert('Facebook error: ' + error.error_description);
			        });
                }
	}
});
