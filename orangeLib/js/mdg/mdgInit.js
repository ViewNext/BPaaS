ORANGE_APP = ORANGE_APP || angular.module('OrangeLib',[]);

ORANGE_APP.directive('mdgInit', function($state,mdgFactory){
	
	return {
		restrict: "EC",
		templateUrl: function() {
			var templatePath = TEMPLATE_PATH;
			switch (APP_NAME) {
				case 'miAmenaApp' : //templatePath += 'mdg/miOrange_mdg.html'; break;
				case 'miOrangeApp': //templatePath += 'mdg/miOrange_mdg.html'; break;
				default : templatePath += 'mdg/mdgInit.html';
			}
			return templatePath;		
		},
		scope : {
			msisdn : "@"
		},
	    link: function(scope,elem, attr) {
	    	
	    	scope.loadMDGFullData = function(msisdn){
	    		
	    		console.log("carga datos de linea: " + msisdn);
	    		if (!msisdn) return false;
	    		if (msisdn > 600000000 && msisdn < 799999999) $state.go('mdgInfo', { msisdn: msisdn });
	    		else $state.go('mdgAdslInfo', { msisdn: msisdn });
	    	}
	    	
	    	
	    	
	      attr.$observe('msisdn', function(NUM) {
	    	  if (NUM > 600000000 && NUM < 799999999) {
	    	    		mdgFactory.loadMDGData(NUM, function(mdgJson, msisdns, lineas){
	    	    			scope.mdgData = mdgJson.cliente;
	    	    			scope.MSISDN_Array = msisdns;
	    	    			scope.lineas = lineas; 
	    	    			console.log("\nMSISDN recibidos:\n" + JSON.stringify(scope.MSISDN_Array));
	    	    			//console.log("\nMDG recibido:\n" + JSON.stringify(scope.mdgData));	    			
			      		}, function(){
			      			console.log("\nMDG: error leyendo datos de MDG");
			      		});	    	    		
    	    		}
	      }, true);
	    }
	  }
})		