'user strict';

app.factory('sessionService',['$http',function($http){
	return{
		set:function(key, value){
			return localStorage.setItem(key,value);
		},
		get:function(key){
			return localStorage.getItem(key);
		},
		clear:function(key){
			return localStorage.removeItem(key);	
		}
	};
}])