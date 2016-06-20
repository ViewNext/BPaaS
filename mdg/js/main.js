
NG_APP.config(function($stateProvider, $provide, $urlRouterProvider,$httpProvider) {
	

	  $httpProvider.defaults.headers.common = {};
	  $httpProvider.defaults.headers.post = {};
	  $httpProvider.defaults.headers.put = {};
	  $httpProvider.defaults.headers.patch = {};


	$stateProvider
	 .state('home', {
		 url: '/home',
		 templateUrl: 'templates/home.html',
		 controller: 'initCtrl'
	 });

	 $urlRouterProvider.otherwise('/home');

})

NG_APP.controller('initCtrl', function($scope, $rootScope, $state){
	
    $rootScope.appName = APP_NAME;

	console.log("initCtrl 35. controlador inicializado");
    
	$scope.setMsisdn = function(){
		$scope.msisdn = $rootScope.BPaaSCatalog.msisdn;
		
	}
    
})
