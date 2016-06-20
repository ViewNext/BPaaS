ORANGE_APP = ORANGE_APP || angular.module('OrangeLib',[]);


function loadGidfIframe() {
    var ifrm = document.getElementById('GidfIframe');
    if (typeof angular.element(ifrm).scope().onIframeLoad === 'function') {
    	angular.element(ifrm).scope().onIframeLoad(ifrm);
    }
}

ORANGE_APP.directive('loginUser', function($sce,GidfService){
	
	return {
		restrict: "EC",
		templateUrl:  TEMPLATE_PATH + "login/loginUser.html",
		scope : {
			msisdn : "=",
			actionMsg : "@action",
		},
	    link: function(scope,elem, attr) {
	    	
		    var hasCookie = false;
			var hasRedirection = false;
	    	scope.showPwdField = BPAAS_GIDF_PASSTHROUGH;
	    	scope.msgKO_BL= null;
		
			scope.GIDFParams = {
	    			NUM_MAX_REINTENTOS_LOGIN_GIDF : 1,
	    			LOGIN_GIDF_SUCCESS : "0",
	    			LOGIN_GIDF_FAIL : "1",
	    			LOGIN_GIDF_BLACKLIST : "2",
	    			TIMEOUT : 10000,
	    			URL_GIDF_OSP_AUTH : $sce.trustAsUrl("https://gidf.orange.es/osp_auth/"),
	    			URL_GIDF_SALTO : "https://gidf.orange.es/WT/salto/",
	    			URL_GIDF_LOGOUT : "https://gidf.orange.es/pkmslogout?returl=http://www.orange.es",
	    			URL_GO_TO_ON_FAIL : $sce.trustAsUrl("https://areaprivada.orange.es/ecare/pub/user/landing/sso.htm"),
	    			URL_GO_TO_NIF : "https://areaprivada.orange.es/cliente/?site=onlyweb&utm_source=orange&utm_medium=telco&utm_term=formLogin&utm_campaign=loginmovil",
	    			URL_GO_TO_MSISDN : "https://areaprivada.orange.es/cliente/?utm_source=orange&utm_medium=telco&utm_term=formLogin&utm_campaign=loginmovil",
	    			URL_GO_TO_ON_BLACKLIST : $sce.trustAsUrl("https://areaclientes.orange.es/error.html?errorCode=LOCK"),
	    			serv : 'NEOSMO',
	    		}	

			scope.GIDFParams_UAT = {
	    			NUM_MAX_REINTENTOS_LOGIN_GIDF : 1,
	    			LOGIN_GIDF_SUCCESS : "0",
	    			LOGIN_GIDF_FAIL : "1",
	    			LOGIN_GIDF_BLACKLIST : "2",
	    			TIMEOUT : 10000,
	    			URL_GIDF_OSP_AUTH : $sce.trustAsUrl("https://gidf-int.orange.es/osp_auth/"),
	    			URL_GIDF_SALTO : "https://gidf-int.orange.es/WT/salto/",
	    			URL_GIDF_LOGOUT : "https://gidf-int.orange.es/pkmslogout?returl=http://www.orange.es",
	    			URL_GO_TO_ON_FAIL : "https://ecare.uat.si.orange.es/ecare/pub/user/landing/sso.htm",
	    			URL_GO_TO_NIF : "https://areaprivada.orange.es/cliente/?site=onlyweb&utm_source=orange&utm_medium=telco&utm_term=formLogin&utm_campaign=loginmovil",
	    			URL_GO_TO_MSISDN : "https://ecare.uat.si.orange.es/cliente/",
	    			URL_GO_TO_ON_BLACKLIST : "https://areaclientes.orange.es/error.html?errorCode=LOCK",
	    			serv : 'NEOSMO',
	    		}	
			
			scope.isValidId = function(id){
				if (!isNaN(id) && id > 600000000 && id <999999999) {
	    	    	scope.GIDFParams.loginType = 'MSISDN'; //valores: NIF, MSISDN
					return true;
				}
				else {				
					//comprobar si es NIF o NIE
					return false
				}
				
			}
			
	    	var goGidf= function(){
				scope.loading=true;
				var ahora= new Date();
				scope.GIDFParams.URL_GO_TO_ON_FAIL += "?msisdn=" + scope.login;
	    		var URL_ACTION = scope.GIDFParams.URL_GIDF_OSP_AUTH + "?timer=" + ahora.getMilliseconds();
				document.getElementById('logonGidf').action = URL_ACTION;
				scope.$evalAsync();
				
				setTimeout( function(){ 
					document.getElementById("logonGidf").submit();
				}, 500) ;
	    		
	    	}
	    	
	    	scope.valida = function() {

	    		    var NUM = parseInt(scope.login);
	    		    var REF = parseInt(scope.msisdn);

		    	    if (!scope.isValidId(NUM)) {
		    	    	//console.log("El MSISDN introducido (" + scope.msisdn + ") no es válido");
		    	    	if (scope.isValidId(REF)) scope.login  = REF;
		    	    	else scope.login = "";
		    	    }
		    	    
		    	    if (BPAAS_GIDF_PASSTHROUGH) {
		    	    	
		    	    	scope.msgKO_BL=null;
		    	    	goGidf(); //validación contra GIDF
		    	    	
		    	    	/**
		    	    	 * procedimiento REST de acceso a GIDF (Experimental).
		    	    	 */
		    	    	/*
		    	    	GidfService.loginGidf(scope.login, scope.password, scope.GIDFParams, function(gidfData){
		    	    		console.log("GIDF OK: " + JSON.stringify(gidfData));
		    	    		scope.msisdn = scope.login;
		    	    	}, function(gidfData) {
		    	    		console.log("GIDF KO:" + JSON.stringify(gidfData));
		    	    	})
		    	    	*/
		    	    } 
		    	    else scope.msisdn = scope.login; //accede sin validar contra Identity
	    	  };
	    	  

		   
		   var exitAsValidUser = function(){

			   if (hasCookie && hasRedirection) {
					console.log("\n******************* IDENTITY: el usuario se ha logado correctamente \n****************************");
					scope.msisdn = scope.login;
					scope.$apply();
			   }
			   
			   
		   }
	    	  
	    	 scope.onIframeLoad = function(iframeObject) {

	    		 	var cookie_ws = iframeObject.contentDocument.cookie.split(";");
	    			var response_url = iframeObject.contentWindow.location.href;
	    			
	    			if (typeof cookie_ws == 'object' ) {
	    				var cookie_wassup = null;
	    				var momento= new Date();
	    				//console.log("IDENTITY " + momento.getTime() + " COOKIE RECIBIDA:\n" + JSON.stringify(cookie_ws));
	    				
	    				for (var v in cookie_ws) {
	    					var cookie_section = cookie_ws[v].split("=");
	    					cookie_section[1] = decodeURI(cookie_section[1]).replace(/%2C/ig,",").replace(/%3A/ig,":").replace(/%3F/ig,'?');
	    					//console.log("IDENTITY:[" + cookie_section[0] + "] --> " + cookie_section[1]);
	    					if (cookie_section[0].indexOf('wassup') > -1) {
	    						cookie_wassup = cookie_section[1];
	    						//console.log("IDENTITY: WASSUP OBTENIDO. LOGON OK");
	    					}
	    					if( cookie_section[0].indexOf('mktz_client') > -1) {
	    						var mktz_json = JSON.parse(cookie_section[1]);
	    						response_url = (mktz_json.landing) ? mktz_json.landing : false;
	    					}
	    				}
	    				if (cookie_wassup) {
	    					hasCookie=true;
	    					exitAsValidUser();
	    				}
	    			}
	    			if (response_url){
	    				var qs = response_url.split("?");
	    				scope.loading=false;
	    				console.log( "scope.msgKO_BL=" + scope.msgKO_BL);
	    				
	    				if ((qs[1]) && qs[1] == scope.GIDFParams.URL_GO_TO_MSISDN.split("?")[1]) {
	    						hasRedirection = true;
	    						iframeObject.src = 'about:blank';
	    						exitAsValidUser();
	    				}
	    				
	    				if (response_url.indexOf(scope.GIDFParams.URL_GO_TO_ON_FAIL) > -1) {
	    					scope.msgKO_BL = "Datos incorrectos. Por favor, revisa tus credenciales.";
	    					console.log("IDENTITY: RESPUESTA KO RECIBIDA.LOGON INCORRECTO.");
    						iframeObject.src = 'about:blank';
    						scope.password="";
    						scope.$apply();
	    				}
	    				if (response_url == scope.GIDFParams.URL_GO_TO_ON_BLACKLIST) {
	    					scope.msgKO_BL="Tu ID ha sido rechazado. Por favor, inicia sesión otro número de teléfono o NIF.";
	    					scope.login="";
	    					scope.password="";
	    					console.log("IDENTITY: RESPUESTA BLACKLIST RECIBIDA.LOGON INCORRECTO.");
	    					iframeObject.src = 'about:blank';
	    				}
	    			}

	    	};
	    	  
	    	  
	    }
	  }
})

/*
 * GidfService: interfaz de validación contra GIDF utilizando un acceso REST/POST
 * Es un método experimental. Necesita revisión para funcionar correctamente (MJR 16.06.2016 
 */
ORANGE_APP.service('GidfService', function($sce,restApiFactory) {


	return {
		
		loginGidfRest : function (username, password, GIDFParams, onSuccess, onFailure) {
		
			var params = {
					'wt-msisdn' : username,
					'wt-pwd':password,
					'gotoOnFail':$sce.trustAsUrl(GIDFParams.GIDFURL_GO_TO_ON_FAIL),
					'gotoOnBlacklist':$sce.trustAsUrl(GIDFParams.URL_GO_TO_ON_BLACKLIST)
			};
			
			switch (GIDFParams.docType){
			case 'NIF': 
						params['goto'] = $sce.trustAsUrl(GIDFParams.URL_GO_TO_NIF);
						params.serv ='NEOSMU';
						params.oH_movilradioempresas2 = 'CIF';
						break;
			case 'MSISDN':
					default:
					params['goto'] = $sce.trustAsUrl(GIDFParams.URL_GO_TO_MSISDN);
					params.serv = 'NEOSMO';
					break;
			}

			
			restApiFactory.post({
						xml:true, 
						urlBase:$sce.trustAsUrl(GIDFParams.URL_GIDF_OSP_AUTH), 
						parameters:'', 
						timeout:GIDFParams.TIMEOUT, 
						retry: GIDFParams.NUM_MAX_REINTENTOS_LOGIN_GIDF
					}, 
				params,
				function(data, status, headers, config) {
					data = data || {};
					data.status = GIDFParams.LOGIN_GIDF_SUCCESS;
					
					onSuccess(data);
					
				},
				function(data, status, headers, config) {
					console.log("fallo en validación GIDF:\n"
							+ "data:" + JSON.stringify(data)
							+ "status:" + status
							+ "headers:" + JSON.stringify(headers)
							+ "config:" + JSON.stringify(config));
					onFailure(data);

				}
			);
		}
	
	}
	
})

