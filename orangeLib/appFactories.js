

ORANGE_APP = angular.module('OrangeLib',[])
.config(function($sceDelegateProvider, $httpProvider, $stateProvider, $urlRouterProvider, $locationProvider){

	window.device = {
			platform : 'desktop'
	};

	var APP_NAME = APP_NAME || "miOrangeApp";

	switch(APP_NAME){
	case 'miAmenaApp' : APP_DOMAIN = "amena.com";
						APP_MARCA = "Amena";
						break;
						
	case "miOrangeApp" : 
	default: 		APP_DOMAIN = "orange.es";
					APP_MARCA = "Orange";
					break;
	}

	BPAAS_GIDF_PASSTHROUGH = false; //true: validación a través de Identity. false: acceso directo a apaches sin validación 

	if (BPAAS_GIDF_PASSTHROUGH) {
		URL_WEB_SERVICES = "https://areaprivada." + APP_DOMAIN + "/neosservices/rest/secured/"; 
		MDG_HOSTNAME = "http://areaprivada." + APP_DOMAIN + "/"; 
	}
	else {
		URL_WEB_SERVICES = "https://services-app-areaprivada.si." + APP_DOMAIN + "/neosservices/rest/secured/"; //path directo sin pasar por Identity
		MDG_HOSTNAME = "http://areaprivada.si." + APP_DOMAIN +"/"; //acceso a datos MDG sin pasar por Identity
	}

	NUM_MAX_REINTENTOS_WS = 2;
	SPINNER_TIMEOUT = 10000;
	POSTREST_TIMEOUT = 10000;
	GETREST_TIMEOUT = 10000;
	STATUS_SESSION_EXPIRED = 511;

	INV_HOSTNAME ="http://10.113.60.188:8091/"; // carga el historial de facturas desde microservicio
	LIB_PATH = "http://localhost/orangeLib/";
	//LIB_PATH = "https://satellite-cms-des.int.si.orange.es/orangeLib/";
	TEMPLATE_PATH = LIB_PATH + "templates/";

	  $httpProvider.defaults.headers.common = {};
	  $httpProvider.defaults.headers.post = {};
	  $httpProvider.defaults.headers.put = {};
	  $httpProvider.defaults.headers.patch = {};
	
	$sceDelegateProvider.resourceUrlWhitelist([
	   'self', // Allow same origin resource loads.
	   // Allow loading from our assets domain.  Notice the difference between * and **.
	  'https://areaprivada.orange.es/**',
	  'https://satellite-cms-des.int.si.orange.es/**',
	  'https://services-app-areaprivada.si.orange.es/**',
	  'https://**amena.com/**']);
	

	$stateProvider
	 .state('services',{
		 url: '/services/:msisdn',
		 templateUrl : TEMPLATE_PATH + 'services/servicesList.html',
		 controller: 'initCtrl'
	 })
	 .state('mdgInfo',{
		 url: '/info/movil/:msisdn',
		 templateUrl : TEMPLATE_PATH + 'mdg/mdgLineInfo.html',
		 controller: 'mdgCtrl'
	 })
	 .state('mdgAdslInfo',{
		 url: '/info/fijo/:msisdn',
		 templateUrl : TEMPLATE_PATH + 'mdg/mdgInfoLineaFijo.html',
		 controller: 'mdgCtrl'
	 });	 
	 //$urlRouterProvider.otherwise('/home');

	 //$locationProvider.html5Mode({ enabled: true, requireBase: false });

	
})
.run(function($rootScope){
	
		$rootScope.BPaaSCatalog = {
			msisdn : '',
			userlevel : null, //0= Gestor, 1=Comercial, 2=Soporte
			lineSelected: '',
			MSISDN_Array: []
	}
	console.log("Inicia la carga de OrangeLib. Catalog:" + JSON.stringify($rootScope.BPaaSCatalog));
})

ORANGE_APP.filter('html',function($sce){
    return function(input){
        return $sce.trustAsHtml(input);
    }
})


ORANGE_APP.filter('dateESP', function(){
	return function(dateInput){
		
		var MDGdatePattern = new RegExp(/(\d){4}-(\d){2}-(\d){2}T(\d){2}:(\d){2}:(\d){2}/); 
		if (MDGdatePattern.test(dateInput) == true) {
			var fecha = dateInput.split("T")[0].split("-");
			return fecha[2] + "/" + fecha[1] + "/" + fecha[0];
		}
		var INVdatePattern = new RegExp(/(\d){8}/);
		if (INVdatePattern.test(dateInput) == true){
			var invalidDate=false;
			var dia = dateInput.substr(0,2); if (dia<"01" || dia > "31") invalidDate=true;
			var mes = dateInput.substr(2,2); if (mes<"01" || mes > "12") invalidDate=true;
			var anyo = dateInput.substr(-4); if (anyo < "1970" || anyo > "2040" ) invalidDate= true;
			if (!invalidDate) return dia+"/" + mes + "/" + anyo;
		}
		else return dateInput;
	}
})


ORANGE_APP.filter('moneyESP', function(){
	return function(amount){
		
		var MDGmoneyPatternWithComma = new RegExp(/[+-]{0,1}(\d){1,},(\d){4}/); 
		if (MDGmoneyPatternWithComma.test(amount) == true) {
			var moneyData = amount.split(",");
			return moneyData[0] + "," + (Math.round(moneyData[1]/100) + "00").substr(0,2);
		}
		else return amount;
	}
})

ORANGE_APP.filter("unlimitedCounter", function(){
	
	return function(counterValue) {
		return (counterValue == -1) ? "Sin límite" : counterValue;
	}
})


ORANGE_APP.factory("profileFactory", function( WebServiceFactory){
	
	var profileCache = {};
	var MSISDN_Array = [];
	
	function clearProfile(msisdn){
		perfil = {
				user : {},
				contract : {},
				lineas : {},
				data : null
		};
		profileCache[msisdn] = perfil;
	}
	
	// búsqueda recursiva de msisdns en el json de Profile
	function seekMSISDN (profileData)
	{
	    for (var key in profileData)
	    {
	        if (typeof profileData[key] == "object" && profileData[key] !== null)
	            seekMSISDN(profileData[key]);
	        else
	            if (key == 'msisdn' || key == 'numerotelefonofijo') {
	            	if (MSISDN_Array.indexOf(profileData[key]) == -1) MSISDN_Array.push(profileData[key]);
	            }
	    }
	    return MSISDN_Array;
	}
	

	
	//carga los datos
	function getUserData (data, status, cbOK){
		if (status == 200) {
				perfil.data = data;
				perfil.user = data.profile.user.party.customer;
				perfil.contract = data.profile.user.contractArray;
				perfil.lineas = data.profile.user.multilineDetailsArray || {};
				
				MSISDN_Array=[];
				var msisdns = seekMSISDN(data);
				for (var x in msisdns){
					var msisdnKey = msisdns[x].toString();
					profileCache[msisdnKey] = perfil;
				}
				if (typeof cbOK == 'function') cbOK(perfil);
				else return perfil;
		}
		else noProfile(data,status); 
	}
	
	function noProfile(msisdn){
		console.log("[profileData]. error en acceso al perfil del usuario para el MSISDN " + msisdn);
		clearProfile(msisdn);
		return perfil;
	}
	
	return {
		loadProfile : function(msisdn, cbOK){
		
			var BPaaSProfile = profileCache[msisdn];
			
			if (typeof BPaaSProfile != 'object' || !BPaaSProfile.data)
				WebServiceFactory.loadProfile(msisdn, function(data, status){ getUserData(data, status, cbOK) }, noProfile(msisdn));
			else {
				console.log("PROFILEFACTORY. lee datos cacheados de MSISDN " + msisdn);
					cbOK(BPaaSProfile);
				}
			},
			
		clearProfile: function(msisdn) { 
				clearProfile() }
			}
	
		clearProfile();
	
})



/******** DATOS MDG **************************************************************************************************
 * Captura info de MDG a partir de valores específicos en atributos de la directiva
 * Niveles de información (de más general a más particular)
 * 1 - cliente
 * 1.1 clienteMovil
 * 1.1.n direccppal : datos postales
 * 1.2 cuentas
 * 1.2.n - cuenta n
 * 1.2.n.1 - datos identificación cuenta n
 * 1.2.n.2 - datos facturación cuenta n
 * 1.2.n.3 - contratos
 * 1.2.n.3.x - contrato x
 * 1.2.n.3.x.1 - lineas prepago contrato x
 * 1.2.n.3.x.1.y - linea prepago y
 * 1.2.n.3.x.2 - lineas pospago contrato x
 * 1.2.n.3.x.2.y - linea pospago y
 * 1.2.n.3.x.2.y.1 - servicios contratados en linea pospago y, contrato x, cuenta n
 * 1.2.n.3.x.2.y.1.z - servicio contratado z
 * 1.2.n.3.x.3 - promociones contrato x
 * 1.2.n.3.x.3.y - promoción y contrato x
 * 1.2.n.3.x.4 - dispositivos asociados contrato x
 * 1.2.n.3.x.4.y - dispositivo asociado y contrato x
 * 
 * ********************************************************************************************************************/
ORANGE_APP.controller('mdgCtrl',function($stateParams,$scope){
    
	console.log("[mdgInfo: inicio del controlador. MSISDN: " + $stateParams.msisdn);
	$scope.lineSelected = $stateParams.msisdn;
})

ORANGE_APP.factory("mdgFactory", function( WebServiceFactory){
	
	var MSISDN_Array = [];
	var mdgData = {};
	var linesArray = [];
	
	function clearMDGData(){
		MSISDN_Array = [];
		mdgData = {};
		linesArray = {};
	}
	
	//carga los datos
	function getMDGData (data, status, cbOK){
		clearMDGData();
		if (status == 200) {
			buildLinesArray(data);
			
			MSISDN_Array=[];
			var msisdns = seekMSISDN(data);
			for (var x in msisdns){
				var msisdnKey = msisdns[x].toString();
				mdgData[msisdnKey] = data;
			}
			if (typeof cbOK == 'function') cbOK(data, MSISDN_Array, linesArray);
			else return ({data: data, MSISDN_Array: MSISDN_Array, linesArray: linesArray});
		}
		else noMDGData(data,status); 

	}
	
	// búsqueda recursiva de msisdns en el json de MDG
	function seekMSISDN (mdgObj)
	{
	    for (var key in mdgObj)
	    {
	        if (typeof mdgObj[key] == "object" && mdgObj[key] !== null)
	            seekMSISDN(mdgObj[key]);
	        else
	            if (key == 'msisdn' || key == 'numerotelefonofijo') {
	            	if (MSISDN_Array.indexOf(mdgObj[key]) == -1) MSISDN_Array.push(mdgObj[key]);
	            }
	    }
	    return MSISDN_Array;
	}
	
	function buildLinesArray(mdgObj){
		linesArray ={
				movil : [],
				fijo : []
		}
				        
		//lineas de movil
		var mdgLineInfo =  mdgObj.cliente.clienteMovil;		
		if (mdgLineInfo){
			for (cta in mdgLineInfo.cuentas) {
				for (contrato in mdgLineInfo.cuentas[cta].contratos){
	
						var lineInfo = mdgLineInfo.cuentas[cta].contratos[contrato];
						var lineaObj = {
							msisdn : lineInfo.msisdn,
							tipocontrato : lineInfo.tipocontrato
						}
							
						for (prep in lineInfo.lineasprepago) {
							lineaObj.estado = lineInfo.lineasprepago[prep].estadolineaprepago;
							lineaObj.fechaactivacion = lineInfo.lineasprepago[prep].fechaaltaactivacionsimprepago;
							break;
						}
						for (post in lineInfo.lineaspospago) {
							lineaObj.estado = lineInfo.lineaspospago[post].estadolineapospago;
							lineaObj.fechaactivacion = lineInfo.lineaspospago[post].fechaactivacionlineapospago;
							break;
						}			
						linesArray.movil.push(lineaObj);
				}//contrato
			}//cta
		}
		//lineas de fijo
		var mdgLineInfo =  mdgObj.cliente.clientefijo;	
		if (mdgLineInfo){
			for (cta in mdgLineInfo.cuentas) {
				for (contrato in mdgLineInfo.cuentas[cta].contratos){
	
						var lineInfo = mdgLineInfo.cuentas[cta].contratos[contrato];
						var lineaObj = {
							msisdn : lineInfo.numerotelefonofijo,
							tipocontrato : lineInfo.tarifaadsldescripcion,
							estado : lineInfo.estadolineafijo,
							fechaactivacion : lineInfo.fechaaltalineafija
						}
				linesArray.fijo.push(lineaObj);
						
				}//contrato
			}//cta
		}
		return linesArray;
		
		
	}
	
	
	function noMDGData(data,status,headers, config){
		console.log("[mdgData]. error en acceso a datos de la cuenta (MDG)"	);
		clearMDGData();
		return false;
	}
	
	function sendLineInfo(linesArray, tipo, cbOK) {
		switch(tipo) {
		case "movil" : if (typeof cbOK == 'function') cbOK(linesArray.movil);
						else return linesArray.movil;
						break;
		case "fijo" : if (typeof cbOK == 'function') cbOK(linesArray.fijo);
						else return linesArray.fijo;
						break;
		default : if (typeof cbOK == 'function') cbOK(linesArray);
					else return linesArray;
					break;
		}
	}
	return {
		loadMDGData : function(msisdn, cbOK){
			
				if (typeof mdgData[msisdn] != 'object')
					WebServiceFactory.loadMdgData(msisdn, function(data, status){ getMDGData(data, status, cbOK) }, noMDGData);
				else {
					//console.log("\nMDGFACTORY - LOADMDGDATA. Lee datos en cache de Servicios de Red para MSISDN " + msisdn);
					getMDGData(mdgData[msisdn], 200, cbOK);
				}
			},
	
		loadLineas : function(msisdn,tipo,cbOk){
			if (typeof mdgData[msisdn] != 'object') {
				WebServiceFactory.loadMdgData(msisdn, function(data, status){ 
						getMDGData(data, status, function(mdgdata,MSISDN_Array,linesArray) {
								sendLineInfo(linesArray,tipo,cbOK);
								
						});
				}, noMDGData);
			}
			else {
				//console.log("\nMDGFACTORY - LOADLINEAS. Lee datos en cache de Servicios de Red para MSISDN " + msisdn);
				getMDGData(mdgData[msisdn], 200, function(mdgdata,MSISDN_Array,linesArray) {
				sendLineInfo(linesArray,tipo,cbOK);
			});
			}
		},
	
	}
	
	clearMDGData();
})



/**
 * catálogo comercial de Orange
 */
ORANGE_APP.factory("catalogFactory", function($http){
	
	var jsonCatalogUrl= LIB_PATH + 'json/catalogo/';
	var catalog = null;
	
	switch(APP_NAME){
		case "miAmenaApp" : jsonCatalogUrl +="miAmena_catalogo.js"; break;
		case "miOrangeApp"   : jsonCatalogUrl +="miOrange_catalogo_movil.js"; break;
	}
	
	if (catalog == null) {
		$http.get(jsonCatalogUrl, function(data){
			
			catalog = data;
			
		}, function(data, status){
			console.log("Error cargando catálogo de " + APP_NAME + " (archivo " + jsonCatalog + ")"
					+ "\ndata:"+ data
					+ "\nstatus:" + status);
		})
	}
	
	return {
		
		getCatalog : function(){
			return catalog;
		},
		
		getProduct : function(productId){
			return ("nombre Del Producto para el id " + productId);
		}
		
	}
	
});


/**
 * activacion de servicios de red
 */

ORANGE_APP.factory('networkServicesFactory', function(profileFactory,WebServiceFactory){
	
	var productList = {};
	var NETWORK_PRODUCT_TYPOLOGY = 3; //servicios de red
	var request = {
			'msisdn' : null,
			'segment' : null,
			'customerId' : null,
			'isMigrated': null,
			'talkplanTypeID' : null,
			'talkplanSubTypeID' : null,
			'installedBase' : { productArray : [] },
			'orderLines' : { orderLineArray : [] },
			'productIdArray' : []
	};
	
	var getProfileParams = function(msisdn, callBackOK){

			profileFactory.loadProfile(msisdn, function(profile){
				request.msisdn = msisdn;
				request.customerId = profile.user.customerId;
				request.isMigrated = profile.data.isMigrated;
				request.installedBase = { productArray : [] };
				request.orderLines= { orderLineArray : [] };
				
				for (w in profile.contract){
					var contrato = profile.contract[w];
						for (x in contrato.lineArray){
							var linea = contrato.lineArray[x];
							request.segment = linea.segment;
							request.talkplanTypeID = linea.voiceRatePlanTypeID;
							request.talkplanSubTypeID = linea.voiceRatePlanSubTypeID;
					}
				}
				callBackOK(request);
				
			}, function(){
				return null;
			})

	};
	
	var trackServices = function(msisdn,servicesData,callBackOk){
		
		productPanel = productShortList(servicesData);
		
		//Cacheamos los datos 
		var msisdnKey = msisdn.toString();
		productList[msisdnKey] = servicesData;
		
		//Llamamos al callback
		if (typeof callBackOk == 'function') callBackOk(productPanel, servicesData);
		else return [productPanel, servicesData];
		
	}
	
	var productShortList = function(productJson) {
		var prodArray = [];		
		if( (productJson) && (productJson.products) && (productJson.products.productArray) ) {

			for(var i = 0; i < productJson.products.productArray.length; i++) {
				prodArray[i] = {
						productId :  productJson.products.productArray[i].productId,
						name :  productJson.products.productArray[i].name,
				}
			}
		}
		//console.log("Lista resumida en getProducts: " + JSON.stringify(prodArray));
		return prodArray;
	}
	
	return {
		
		getProducts : function(msisdn, arrayProductos,  onSuccess, onFailure) {
			/**
			 * getProducts : función que nos devuelve todos los servicios de red asociados a la línea
			 * 
			 * retorna:
			 * 	- productPanel: array de resumen de los productos contratados
			 *  - productList : JSON completo devuelto por el API Rest getProducts()
			 */
			//Si la lista de servicios para este msisdn no está cacheada se carga.
			
			if(typeof productList[msisdn] != 'object') {
				getProfileParams(msisdn, function(request){
					//completa los valores de request que se han cargado en getProfileParams
					request.typologies = {
							typologiesArray : [
							                   	{
							                	   type : NETWORK_PRODUCT_TYPOLOGY
							                   	}
							                   ]
							}
					request.invalidateCache = true;
					request.clearCache = true;
					request.productIdArray = arrayProductos;
				
				//Realizamos la llamada al WS
				WebServiceFactory.getProducts(request, function(data){
						
						trackServices(msisdn, data, onSuccess); 

					}, 
					function(data){
						//Eliminamos la caché
						productList[msisdn] = null;
						onFailure(data);
					});
				})//request.msisdn != msisdn
				
			} else {
				console.log("\nNETWORKSERVICESFACTORY. Lee datos en cache de Servicios de Red para MSISDN " + msisdn);
				trackServices(msisdn, productList[msisdn], onSuccess);
			}
		},

		setProduct : function(msisdn, productId, activate, onSuccess, onFailure) {
			/**
			 * setProduct : función que activa o desactiva un servicio de red concreto para un MSISDN
			 * argumentos: 
			 * 	- msisdn
			 *  - productId: código del servicio, obtenido de getProducts (productId)
			 *  - activate: true (activar), false (desactivar)
			 * retorna:
			 */
			//Si la lista de servicios para este msisdn no está cacheada se carga.
			
				getProfileParams(msisdn, function(request){
					//completa los valores de request que se han cargado en getProfileParams
					request.processType = "SERVICES";
					if (activate) {
						request.orderLines= {
							orderLineArray: [{
								productId: productId
							}]
						}
					}
					else {
						request.installedBase = {
							productArray: [{
								productId:productId
							}]
						}
					}
				//Realizamos la llamada al WS
				WebServiceFactory.setAsyncNetworkServices(request, function(data, status){
						
						console.log("SETPRODUCT. Respuesta del servicio web: " + JSON.stringify(data) + " status:" + status);
						onSuccess(data);
						//trackServices(msisdn, data, onSuccess); 

					}, 
					function(err){
						console.log("SETPRODUCT. Error en activacion/desactivación de servicio. Err=" + JSON.stringify(err));
						onFailure();
					});
				})//request.msisdn != msisdn
				
			} 

	}
})


