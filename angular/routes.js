
app.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider){
    $routeProvider
        .when('/',{
            // location of the template
            templateUrl     : 'views/index-view.html',
            // Which controller it should use
          controller        : 'mainController',
            controllerAs    : 'main'
        })
        .when('/list',{
            // location of the template
        	templateUrl		: 'views/list-view.html',
        	// Which controller it should use
          controller 		: 'listController',
        	controllerAs 	: 'list'
        })
        .when('/detail',{
        	templateUrl     : 'views/detail-view.html',
        	controller 		: 'detailController',
        	controllerAs 	: 'detail'
        })
        .otherwise(
            {
                //redirectTo:'/'
                templateUrl   : 'views/error.html'
            }
        );
        $locationProvider.html5Mode({
  enabled: false,
  requireBase: false
}).hashPrefix('');
}]);
