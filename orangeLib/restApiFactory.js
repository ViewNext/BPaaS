/**
 * REST API Factory
 */

ORANGE_APP.factory('restApiFactory',function($http, $rootScope){
	
	
	/*channel
	   ☐ Desktop/Tablet       1
	   ☐ Mobile_ios           101 
	   ☐ Mobileandroid        102 
	   ☐ Mobile_rim           103 
	   ☐ Landing_Page_orange  5 
	   ☐ TV                   10 
	 */
	/**
	 * Array con los valores para channel correspondientes a las plataformas
	 */
	var channelTypes = {
			"iOS":'101',
			"Android":'102',
			"BlackBerry 10":'103',
			"desktop" : 1
			};
	
	//Valor del timeout por defecto
	var timeoutDefault = 5000;
	

	return {
		/**
		 * Método que devuelve el tipo de canal segun la plataforma
		 */
			getChannelType:function(platform){
				
				if(platform != 'Android' && platform != 'BlackBerry'){
					platform = platform.split(' ')[0];
					return channelTypes[platform];
				}else {
					return channelTypes[platform];
				}
				
			},
			/**
			 * Método GET HTTP para consultas
			 */
			get : function(data,succesCallback,errorCallback){
			
				var Headers= {
						
					'Content-Type': 'application/json; charset=utf-8',
                	'channel'	: channelTypes[device.platform],
                	'Lang'		: 'es_ES',
                	'Uuid'		: device.uuid,
                	'Msisdn'	: data.headers.msisdn
				};
				
				//Seteamos el timeout al valor por defecto. En caso de que venga informado en el data lo cambiamos
				var timeout = timeoutDefault;
				
				if((data.timeout) && data.timeout > 0) timeout = data.timeout;
				if((data.headers) && data.headers) 	Headers = data.headers;
				
				//Seteamos el número de reintentos al valor por defecto. En caso de que venga informado en el data lo cambiamos
				var reintentos = ((data.retry) && data.retry > 1) ? data.retry : 1;

				//Seteamos el responseType
				var responseType = (data.responseType) ? data.responseType : 'json';
				
				//Si se va a recuperar un XML
				if(data.xml){
					
					var request = function() {
						
						reintentos--;
						
						$http({method: 'GET',
							url: data.urlBase+data.parameters,
							headers: {
								
								'Content-Type': 'application/x-www-form-urlencoded',
			                	'channel'	: channelTypes[device.platform],
			                	'Lang'		: 'es_ES',
			                	'Uuid'		: device.uuid,
			                	'Msisdn'	: data.headers.msisdn
							},
							withCredentials : true,
							crossDomain: true,
							timeout: timeout,
							transformResponse:function(data) {
				                // convert the data to JSON and provide
				                // it to the success function below
								  //l.info("data:"+ JSON.stringify(data));
				                  var x2js = new X2JS();
				                  var json = x2js.xml_str2json( data );
				                  //l.info("json:"+ JSON.stringify(json));
				                  return json;
							}
						})
						.success(function (data, status, headers, config) {
									succesCallback(data, status, headers, config);
								})
						.error(function (data, status, headers, config) {
							
							if(reintentos > 0) {
								
								//Llamada recursiva para que vuelva a reintentar la petición
								request();
								
							} else {
								errorCallback(data, status, headers, config);
							}
						});	
					}
					
					//Hacemos la petición
					request();
					
				}else{//Si se va a recuperar un JSON
					
					if((data.cms) && data.cms==true ){

							var request = function () {
								
								reintentos--;
								
								$http({method: 'GET',
									url: data.urlBase+data.parameters									
								})
								.success(function (data, status, headers, config) {
									succesCallback(data, status, headers, config);
								})
								.error(function (data, status, headers, config) {
									
									if(reintentos > 0) {
										
										//Llamada recursiva para que vuelva a reintentar la petición
										request();
										
									} else {
										errorCallback(data, status, headers, config);
									}
								});	
							}
							
							//Hacemos la petición
							request();
						
				}else{
					var request = function () {
						
						reintentos--;
						
						$http({method: 'GET',
							url: data.urlBase+data.parameters,
							responseType : responseType,
							headers: Headers,
							withCredentials : true,
							crossDomain: true,
							timeout: timeout
						})
						.success(function (data, status, headers, config) {
							succesCallback(data, status, headers, config);
						})
						
						.error(function (data, status, headers, config) {
							
							if(reintentos > 0)	request(); //Llamada recursiva para que vuelva a reintentar la petición
							else {
								errorCallback(data, status, headers, config);
							}
						});	
					}
					request(); //Hacemos la primera petición
				}
				}
			},
			/**
			 * Método POST HTTP para modificar/enviar datos
			 */		
			post : function(data,params,succesCallback,errorCallback){
				
				//Seteamos el timeout al valor por defecto. En caso de que venga informado en el data lo cambiamos
				var timeout = timeoutDefault;
				
				if((data.timeout) && data.timeout > 0) timeout = data.timeout;
				var reintentos = ((data.retry) && data.retry > 1) ? data.retry : 1;
				
				//Si se va a recuperar un XML
				if(data.xml){

					var request = function() {

						reintentos--;

						$http({method: 'POST',
							url: data.urlBase,
							headers: {
									'Content-Type': 'application/x-www-form-urlencoded',
				                	'channel'	: channelTypes[device.platform],
				                	'Lang'		: 'es_ES',
				                	'Uuid'		: params.uuid,
				                	'Msisdn'	: params.msisdn
								},
							data : params,
							withCredentials : true,
							crossDomain: true,
							timeout: timeout,
							transformResponse:function(data) {
				                	// convert the data to JSON and provide it to the success function below
				                  // var x2js = new X2JS();
				                  // var json = x2js.xml_str2json( data );
				                  //l.info("json:"+ JSON.stringify(json));
				                  //return json;
								return data;
							}
						})
						.success(succesCallback)
						.error(function (data, status, headers, config) {
							
							if(reintentos > 0) {
								
								//Llamada recursiva para que vuelva a reintentar la petición
								request();
								
							} else {
								errorCallback(data, status, headers, config);
							}
						});
					}
					
					//Hacemos la petición
					request();
					
				}else{//Si se va a recuperar un JSON	

					var request = function() {
						
						reintentos--;
					     var Headers= {
								'Content-Type': 'application/json; charset=utf-8',
			                	'channel'	: channelTypes[device.platform],
			                	'Lang'		: 'es_ES',
			                	'Uuid'		: params.uuid,
			                	'Msisdn'	: params.msisdn
							};
					     if(data.headers) {
								Headers = data.headers;
							}
						$http({method: 'POST',
							url: data.urlBase,
							headers:Headers,
							data : params,
							withCredentials : true,
							crossDomain: true,
							timeout: timeout
						})
						.success(succesCallback)
						.error(function (data, status, headers, config) {
							
							if(reintentos > 0) 	request(); //Llamada recursiva para que vuelva a reintentar la petición
							else {
								errorCallback(data, status, headers, config);
							}
						});
					}
					
					//Hacemos la petición
					request();
				}
			}
	};
});