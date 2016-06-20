ORANGE_APP = ORANGE_APP || angular.module('OrangeLib',[]);

ORANGE_APP.directive('inputMsisdn', function(){
	return {
		restrict: "EC",
		templateUrl:  TEMPLATE_PATH + "login/inputMsisdn.html",
		scope : {
			msisdn : "="
		},
	    link: function(scope,elem, attr) {
	    	scope.$watch("msisdn", function(newValue, oldValue) {
	    	      var NUM = parseInt(newValue);
		    	    if (isNaN(NUM) || NUM < 600000000 || NUM > 999999999) {
		    	    	//console.log("El MSISDN introducido (" + scope.msisdn + ") no es válido");
		    	    	if (scope.msisdn.length >= 9) scope.msisdn  = "";
		    	    }
	    	  });
	    }
	  }
})