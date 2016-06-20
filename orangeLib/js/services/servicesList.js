ORANGE_APP = ORANGE_APP || angular.module('OrangeLib',[]);

ORANGE_APP.directive('servicesList', function(networkServicesFactory, catalogFactory){
	
	return {
		restrict: "EC",
		templateUrl: TEMPLATE_PATH + 'services/servicesList.html',
		scope : {
			msisdn : "@"
		},
	    link: function(scope,elem, attr) {
	    	attr.$observe('msisdn', function(NUM){
	    	  
	    			if (NUM > 600000000 && NUM < 799999999){
	    				networkServicesFactory.getProducts(NUM,[],function(shortList,networkServices){
	    					//console.log("\n" +  NUM + " Servicios de red:\n" + JSON.stringify(shortList));
	    					scope.networkServices = networkServices.products.productArray;
	    					
	    				}, function(err){
	    					console.log("Error leyendo la lista de servicios de red para " + NUM + ": " + err);
	    				});
	    	  		}
	    		});
	    	
	    	scope.changeNetworkServiceStatus = function(ns){
	    		
	    		var estado = ns.installedFlag;
	    		ns.toggleProtected=true;
	    		networkServicesFactory.setProduct(scope.msisdn, ns.productId, estado, function(data, status){
	    			ns.toggleProtected=false;
	    			alert("El servicio " + ns.name + " ha sido " + ((estado)? 'activado' : 'desactivado') + " correctamente.");
	    		}, function(){
	    			ns.toggleProtected=false;
	    			alert("Error en la " + ((estado) ? 'activación' : 'desactivación') + " del servicio " + ns.name +".\nVuelve a intentarlo en unos minutos");
	    			ns.installedFlag = !estado;
	    		})
	    	}
	    	
	    	}
	    }
})