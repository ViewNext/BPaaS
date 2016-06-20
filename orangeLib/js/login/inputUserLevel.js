ORANGE_APP = ORANGE_APP || angular.module('OrangeLib',[]);

ORANGE_APP.directive('inputUserLevel', function(){
	return {
		restrict: "EC",
		templateUrl:  TEMPLATE_PATH + "login/inputUserLevel.html",
		scope : {
			userlevel :"="
		},
		link: function(scope,elem,attr){

			scope.niveles = ["Gestor",'Comercial','Soporte'];

	    	scope.$watch("userlevel", function(newValue, oldValue) {
	    	      var NUM = parseInt(newValue);
		    	    if (isNaN(NUM) || NUM < 0 || NUM >= scope.niveles.length) {
		    	    	//console.log("El MSISDN introducido (" + scope.msisdn + ") no es válido");
		    	    	scope.userlevel=null;
		    	    }
		    	    //else console.log("Se selecciona nivel/perfil de acceso num " + NUM + " : " + scope.niveles[NUM]);
	    	  });
		}
	  }
})