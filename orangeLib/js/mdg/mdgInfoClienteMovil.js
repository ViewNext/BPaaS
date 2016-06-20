ORANGE_APP = ORANGE_APP || angular.module('OrangeLib',[]);

ORANGE_APP.directive('mdgInfoClienteMovil', function(mdgFactory){
	return {
		restrict: "EC",
		templateUrl: function() {
			var templatePath = TEMPLATE_PATH;
			switch (APP_NAME) {
				case 'miAmenaApp' : //templatePath += 'mdg/miAmena_mdgInfoClienteMovil.html'; break;
				case 'miOrangeApp': //templatePath += 'mdg/miOrange_mdgInfoClienteMovil.html'; break;
				default : templatePath += 'mdg/mdgInfoClienteMovil.html';
			}
			return templatePath;		
		},
		scope : {
			msisdn : "@"
		},
	    link: function(scope,elem, attr) {
	      attr.$observe('msisdn', function(NUM) {
	    	  if (NUM > 600000000 && NUM < 799999999){

	    	    		mdgFactory.loadMDGData(NUM, function(mdgJson){
	    	    			scope.mdgUserInfo =  mdgJson.cliente.clienteMovil;
	    	    			scope.mdgUserAddress = {
	    	    					tipoVia: 'Calle',
	    	    					pais: 'España'
	    	    			}
	    	    			for (key in scope.mdgUserInfo.direccppal) {
	    	    				if (scope.mdgUserInfo.direccppal.hasOwnProperty(key)) {
	    	    						scope.mdgUserAddress = scope.mdgUserInfo.direccppal[key];
	    	    						break;
	    	    				}
	    	    			}
	    	    			//console.log("\nMDG recibido:\n" + JSON.stringify(mdgJson));	    			
			      		}, function(){
			      			console.log("\nMDG: error leyendo datos de MDG");
			      		});	    	 
   		
    	    		}
	      }, true);
	    }
	  }
})
