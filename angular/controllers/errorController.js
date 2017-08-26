//Declare the controller

app.controller('errorController',['$location',function($location){

	this.goHome=function(){
		$location.path("/");
	};

}]);