ORANGE_APP = ORANGE_APP || angular.module('OrangeLib',[]);

ORANGE_APP.directive('invoiceDetailNav', function(WebServiceFactory){
	return {
		restrict: "EC",
		templateUrl: function() {
			var templatePath = TEMPLATE_PATH;
			switch (APP_NAME) {
				case 'miAmenaApp' : //templatePath += 'invoice/miAmena_invoiceDetailNav.html'; break;
				case 'miOrangeApp': //templatePath += 'invoice/miOrange_invoiceDetailNav.html'; break;
				default : templatePath += 'invoice/invoiceDetailNav.html';
			}
			return templatePath;		
		},
		scope : {
			invoice : "@"
		},
	    link: function(scope,elem, attr) {
	    	
	      scope.showLineDetailConcepts = function(msisdn){
	    	  scope.lineaDetailRequest = msisdn;
	    	  console.log("\nSOLICTA DETALLES DE FACTURA PARA LA LINEA " + msisdn);
	      }	
	      
	      scope.invoiceDetailRequest = {};
	      scope.cargandoDatos=false;
	      
	      var loadInvoiceData = function(data) {
	    	  	
		    	 var invoiceObj = JSON.parse(data);
		    	 scope.detalleFactura= null;
		    	 scope.cargandoDatos=true;
		    	 scope.lineaDetailRequest={};
	    		
		    		WebServiceFactory.loadInvoiceDetail(invoiceObj, function(data){
		    			scope.detalleFactura = data;
		    			scope.impuestos = data.impuestos.detalleArray;
		    			scope.conceptos = data.conceptosArray;
		    			scope.invoiceDetailRequest = invoiceObj;
		    			scope.lineaDetailRequest = null;
		    			scope.cargandoDatos=false;
		    			
		    		}, function(data){
			    		console.log("\n*********\nError en petición de datos de la factura:" + JSON.stringify(data));
			    		scope.cargandoDatos=false;
		    		});   	
	      }

	      scope.$watch(function() { return attr.invoice }, function(newValue, oldValue, scope) {
	    	  if (newValue) loadInvoiceData(newValue);
	      }, true);

	    }
	  }
})

ORANGE_APP.directive('invoiceLineDetail', function(WebServiceFactory){
	return {
		restrict: "EC",
		templateUrl: function() {
			var templatePath = TEMPLATE_PATH;
			switch (APP_NAME) {
				case 'miAmenaApp' : //templatePath += 'invoice/miAmena_invoiceLineDetail.html'; break;
				case 'miOrangeApp': //templatePath += 'invoice/miOrange_invoiceLineDetail.html'; break;
				default : templatePath += 'invoice/invoiceLineDetail.html';
			}
			return templatePath;		
		},
		scope : {
			invoice : "@",
			linea : "@",
			requested : "@"
		},
	    link: function(scope, elem, attr) {
	    	
	      scope.invoiceLineObj = JSON.parse(scope.invoice);
	      scope.invoiceLineObj.numeroLinea = scope.linea;
    	  //console.log("invoicelinedetail. Datos linea:" + scope.linea + " - requested: " + scope.requested + " - datos invoice:" + JSON.stringify(scope.invoiceLineObj));
    	  
	      attr.$observe('requested', function(reqLine) {
	    	  
	    	  if (scope.invoice == "" || scope.linea != reqLine) return false;
		    	 
		    	 scope.detalleLinea= null;
	    		
		    		WebServiceFactory.loadInvoiceLineDetail(scope.invoiceLineObj, function(data){
		    			scope.detalleLinea = data.filaArray;
			    		console.log("\n***********LINE DETAIL: datos obtenidos:\n " + JSON.stringify(data) );
		    			
		    		}, function(data){
			    		console.log("\n*********\nError en petición de datos de la factura:" + JSON.stringify(data));
		    		});   	 

	      }, true);
	    }
	  }
})

