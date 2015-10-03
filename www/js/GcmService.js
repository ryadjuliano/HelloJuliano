'use strict';

app.factory('GcmService', function($http, $location, $state, $ionicLoading){
	//$scope.msgtxt='';
	return{
		function getInfo() {
        	openFB.api({
            path: '/me',
            success: function(data) {
                console.log(JSON.stringify(data));    
                
                alert(data);
                //var ceko='Facebook';
                
                if(ceko){
                    
                    localStorage.setItem("token", ceko);
                     //alert(data.first_name);
                     localStorage.setItem("fbn",data.first_name);
                     localStorage.setItem("fbln",data.last_name);
                     localStorage.setItem("fbe",data.email);
                     localStorage.setItem("fbid",data.id);
                     //cekprof();
                    
                    
                }
               /*
                
                localStorage.setItem("fbn",data.first_name);
                localStorage.setItem("fbln",data.last_name);
                localStorage.setItem("fbe",data.email);
                localStorage.setItem("fbid",data.id);
                */
                
                
                
            },
            error: errorHandler});
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
		}
	}
});
