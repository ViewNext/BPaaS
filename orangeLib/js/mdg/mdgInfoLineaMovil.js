ORANGE_APP = ORANGE_APP || angular.module('OrangeLib',[]);

ORANGE_APP.directive('mdgInfoLineaMovil', function(mdgFactory, catalogFactory){
	return {
		restrict: "EC",
		templateUrl: function() {
			var templatePath = TEMPLATE_PATH;
			switch (APP_NAME) {
				case 'miAmenaApp' : //templatePath += 'mdg/miAmena_mdgInfoLineaMovil.html'; break;
				case 'miOrangeApp': //templatePath += 'mdg/miOrange_mdgInfoLineaMovil.html'; break;
				default : templatePath += 'mdg/mdgInfoLineaMovil.html';
			}
			return templatePath;		
		},
		scope : {
			lineselected : "@"
		},
	    link: function(scope,elem, attr) {

	      
	      attr.$observe('lineselected', function(NUM) {
		      scope.lineInfo = null;
		      console.log("lineSelected:" + scope.lineselected)
	    	  if (NUM > 600000000 && NUM < 799999999){

	    	    		mdgFactory.loadMDGData(NUM, function(mdgJson){
	    	    			var mdgLineInfo =  mdgJson.cliente.clienteMovil;

	    	    			for (cta in mdgLineInfo.cuentas) {
	    	    				for (contrato in mdgLineInfo.cuentas[cta].contratos){
	    	    					if (mdgLineInfo.cuentas[cta].contratos[contrato].msisdn == scope.lineselected) {
	    	    						scope.lineInfo = mdgLineInfo.cuentas[cta].contratos[contrato];
	    	    						
	    	    						
		    	    					    for (w in scope.lineInfo.lineaspospago){
		    	    					    	pospago = scope.lineInfo.lineaspospago[w];
		    	    					    	//console.log("[1] Número de id pospago" + w );
		    	    					    	//console.log("[2] estado: " + pospago.estadolineapospago);
		    	    					    	//console.log("[3] activo desde: " + pospago.fechaactivacionlineapospago.split("T")[0]);
		    	    					    	
		    	    					    	/*
	    	    					    		console.log("[4]. Relación de contadores:");
		    	    					    	for (i in pospago.contadores){
		    	    					    		for (cName in pospago.contadores[i]){
		    	    					    			console.log("[4.a]. Contador " + i + " " + cName + ": " + pospago.contadores[i][cName] );
		    	    					    		}
		    	    					    	}//contadores

	    	    					    		console.log("[5]. Relación de servicios contratados:");
	    	    					    		*/
		    	    					    	for (j in pospago.servicioscontratados){
		    	    					    		sIdent = pospago.servicioscontratados[j].identificador;
		    	    					    		sFecha = pospago.servicioscontratados[j].fechaactivacion.split("T")[0];
		    	    					    		sDesc = catalogFactory.getProduct(sIdent); 
		    	    					    			//console.log("[5a]. Servicio " + j + " " + sIdent + ": " + sDesc + " activado el " + sFecha );

		    	    					    	}//servicios contratados	    	    					    	
		    	    					    }//pospago
		    	    					    
	    	    						}//lineselected
	    	    					}//contrato
	    	    			} //cta
	    	    			//console.log("\n**********\ndatos de MSISDN " + scope.lineselected + ": " + JSON.stringify(scope.lineInfo));
			      		}, function(){
			      			console.log("\nMDG: error leyendo datos de MDG");
			      		});	    	 
   		
    	    		}
	      }, true);
	    }
	  }
})