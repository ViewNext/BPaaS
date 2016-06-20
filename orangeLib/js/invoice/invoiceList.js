/**
 * Datos de factura
 */
ORANGE_APP = ORANGE_APP || angular.module('OrangeLib',[]);
INV_HOSTNAME ="http://10.113.60.188:8091/";


ORANGE_APP.directive('invoiceList', function(profileFactory, WebServiceFactory, $rootScope){
	return {
		restrict: "EC",
		templateUrl: function() {
			var templatePath = TEMPLATE_PATH;
			switch (APP_NAME) {
				case 'miAmenaApp' : //templatePath += 'invoice/miAmena_invoiceList.html'; break;
				case 'miOrangeApp': //templatePath += 'invoice/miOrange_invoiceList.html'; break;
				default : templatePath += 'invoice/invoiceList.html';
			}
			return templatePath;		
		},
		scope : {
			msisdn : "@"
		},
	    link: function(scope,elem, attr) {
	    	
	    	scope.cargandoFacturas = false;
	    	scope.errorFacturas = false;
	    	scope.sinFacturas = false;

	    	//Listado de facturas
	    	scope.invoices = [];
	    	var months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
	    	var spanishShortMonths = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
	    	var spanishMonths = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
	    	var englishMonths = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
	    	var request = {};
	    	
	    	var translateMonth = function(month,type){
	    		var mn = parseInt(month) -1; if (mn<0 || mn >11) return '';
	    		switch (type){
		    		case 0 : return spanishShortMonths[mn];
		    		case 1 : return spanishMonths[mn];
		    		case 2 : return englishMonths[mn]; 
	    		}
	    	};
	    	

	    	scope.goInvoiceDetails = function(invoice){
	    		if (!invoice) return false;
	    		request.idFactura = invoice.idFactura;
	    		request.anio = invoice.anio;
	    		request.mes = invoice.mes;
	    		request.numeroLinea = request.msisdn;
	    		
	    			$rootScope.BPaaSCatalog.invoiceDetailRequest = request; 
		     };
	    	
		      attr.$observe('msisdn', function(NUM) {
		    	    if (NUM > 600000000 && NUM < 799999999) {
		    	    	scope.cargandoFacturas=true;
		    	    	profileFactory.loadProfile(NUM, function(profile){
		    	    		//datos de perfil necesarios
		    	    		request = { 
		    	    				msisdn : NUM,
		    	    				segment : profile.contract[0].lineArray[0].segment,
		    	    				customerId : profile.user.customerId,
		    	    				customerCode : profile.user.customerCode,
		    	    				numDocumento : profile.user.identityNum,
		    	    				isMigrated : profile.isMigrated,
		    	    		};
		    	    		  WebServiceFactory.getHistoricoFacturas(request,function(data){ //acceso genérico por servicio web
		    	    			  
		    	    		 // WebServiceFactory.loadInvoiceList(request,function(dataMS){ //acceso mediante microservicio
		    	    		 //	  data = dataMS.value;
		    	    			  if(data!=null && data.facturasArray != null && data.facturasArray.length > 0){
								
										scope.errorFacturas = false;
										scope.sinFacturas = false;
									
										scope.invoiceList = [];
										for (x in data.facturasArray){
											scope.invoiceList[x] = {
													idFactura : data.facturasArray[x].idFactura,
													importe : data.facturasArray[x].importe,
													mes : data.facturasArray[x].mes,
													anio : data.facturasArray[x].anio,
													fecha : translateMonth(data.facturasArray[x].mes, 1) + " " + data.facturasArray[x].anio
											};
										}
										
										
										
										
									    scope.invoiceChart = {};
										scope.invoiceChart.labels = [];
										scope.invoiceChart.data = [[]];
										scope.invoiceChart.dataUrl = {};
										var max = 0;
										var today = new Date();
										var actualMonth= today.getMonth();							
									
										//Recorremos las facturas y montamos el array con los labels e importes
										for(var i = data.facturasArray.length - 1; i >= 0; i--) {
											
											var factura = data.facturasArray[i];
											var label = translateMonth(factura.mes,0) + "." + factura.anio;
											scope.invoiceChart.labels.push(label);
											
											var dataUrl = new Object();
											dataUrl.idFactura = factura.idFactura;
											dataUrl.mes = factura.mes;
											dataUrl.anio = factura.anio;
											dataUrl.version = factura.version;
											
											scope.invoiceChart.dataUrl[label] = dataUrl;
											
											var importe =  0;
											
											if(factura.importe != null && factura.importe != "") {
												importe = parseFloat(factura.importe.replace(",", "."));
											}
											
											scope.invoiceChart.data[0].push(importe);
											if(max < importe)
												max  = importe;
										}
										
										//completa la serie de etiquetas hasta 6 elementos si el número de meses es inferior
										for (i= scope.invoiceChart.labels.length; i < 6; ++i) {
											scope.invoiceChart.labels[i] = ''; 
										}
											
										var scaleSteps = 4; 
										var scaleIntervals = [5,10,25,50,100,250,500,1000];
										
										for (var x=0;x<scaleIntervals.length; ++x){
											var TRAMO = scaleIntervals[x];
											var scaleLimit = TRAMO * scaleSteps;
											if (scaleLimit > max) break;
										}
										
										scope.invoiceChart.series = ['Factura'];
										
										if (APP_NAME == "miOrangeApp")
										scope.invoiceChart.colours = [{
											fillColor: 'rgba(75, 180, 230, 1)',
										    strokeColor: 'rgba(75, 180, 230, 0.8)',
										    highlightFill: 'rgba(0, 100,128, 1)',
										    highlightStroke: 'rgba(0,100,128,0.8)'
										}];
										else 
											scope.invoiceChart.colours = [{
												fillColor: 'rgba(0, 167, 25, 1)',
											    strokeColor: 'rgba(0, 167, 25, 1)',
											    highlightFill: 'rgba(0, 167, 25, 1)',
											    highlightStroke: 'rgba(0, 167, 25, 1)'
											}];
										
										scope.invoiceChart.options = {
											scaleShowHorizontalLines: true,
											scaleShowVerticalLines: false,
											scaleOverride: true,
											scaleLabel: "<%=value%>€",
											scaleSteps: scaleSteps,
										    scaleStepWidth: TRAMO,
										    scaleStartValue: 0,
										    scaleShowTickMarks : false,
										    showTooltips: true,
										    tooltipYPadding : 'top',
											tooltipEvents: ["click", "mousemove", "touchstart", "touchmove", "mouseout"],
											tooltipTemplate : "<%=value%>",
											tooltipFillColor: "rgba(0,0,0,0)",
											tooltipFontColor: "#000",
											tooltipFontSize: 10,
											tooltipFontStyle: 'bold',
											tooltipCaretSize : 0,
											tooltipCornerRadius: 0,
											tooltipValueFormat : 'money',
										    onClickHandler: function(value) {
											   	if (APP_NAME == "miOrangeApp") {
												   	var invoiceData = {
												   		idFactura : scope.invoiceChart.dataUrl[value.label].idFactura,
												   		anio : scope.invoiceChart.dataUrl[value.label].anio,
												   		mes : scope.invoiceChart.dataUrl[value.label].mes
												   		}
											   		scope.goInvoiceDetails(invoiceData);
											    	}
											   	//else $rootScope.goToExternal (URL_LISTA_FACTURAS,'iFrameheader',"");
										    	//return false;
										    	}
										};
										
										
										
										
										
										
										
										
										
										
										
										
										
								}
								else {
									scope.sinFacturas = true;
								}
								scope.cargandoFacturas = false;
							},
							function(data){
								scope.sinFacturas = true;
								scope.cargandoFacturas = false;
								scope.errorFacturas = true;
								console.log("Ha ocurrido un error en invoiceList: " + JSON.stringify(data));
							}
		    			  );	
		    	    	})
		    	    }
		      }, true);
	    }
	  }
})
