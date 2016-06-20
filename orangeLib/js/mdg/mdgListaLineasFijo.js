ORANGE_APP = ORANGE_APP || angular.module('OrangeLib',[]);
                                                       
ORANGE_APP.directive('mdgListaLineasFijo', function(mdgFactory){
	
	return {
		restrict: "EC",
		templateUrl: TEMPLATE_PATH + "mdg/mdgListaLineasFijo.html",
		scope: {
			msisdn : "@"
		},
		link : function(scope,elem,attr){
			
		      attr.$observe('msisdn', function(NUM) {
		    	  if (NUM > 600000000 && NUM < 799999999){
		    	    		mdgFactory.loadMDGData(attr.msisdn, function(mdgJson, MSISDN){
		    	    			scope.MSISDN_Array = MSISDN;
		    	    			scope.mdgInfoFijo =  mdgJson.cliente.clientefijo;
		    	    			//console.log("\nMDG FIJO recibido:\n" + JSON.stringify(scope.mdgInfoFijo));	    			
				      		}, function(){
				      			console.log("\nMDG FIJO: error leyendo datos de MDG");
				      		});	    	 
	    	    		}
		      }, true);
		}
	}
})