/**
 * Factoria encargada de realizar las llamadas de al web service de
 * configurancion de notificaciones
 */

ORANGE_APP.factory('WebServiceFactory',function(restApiFactory, $rootScope) {

					var PROFILE = "profile/getProfileRest/";
					var USAGE = "usage/getUsageRest/requestType/";
					var BALANCE = "usage/getBalanceRest/";
					var	EXPEDIT_LIMITS="usage/setMaxUsageExpeditRest/";
					var DOWNLOADLIST = "listing/getDownloadsListRest/";
					var CUSTOMERINFO = "customer/getCustomerRest/";
					var CONSULTINGSERVICE = "network/getProductsRest/";
					var UPDATECUSTOMERINFO = "customer/updateCustomerRest/";
					var UPDATECUSTOMEREMAIL = "customer/updateCustomerEmailRest/";
					var NORMALIZECUSTOMERADDRESS = "customer/normalizeCustomerAddressRest/";
					var VALIDATEENTITYBANK = "customer/validateEntityBankRest/";
					var SETCREDITADVANCE = "topup/setCreditAdvanceAsyncRest/";
					var TRANSFERBALANCE = "balancetransfers/transferBalanceRest/";
					var ASKFORBALANCE = "balancetransfers/askForBalanceRest/donatorMSISDN/";
					var SET_ORDER = "order/setOrderRest/";
					var SET_ORDER_ASYNC = "order/setOrderAsyncRest/";
					var REGISTER_PAYMENT_TOPUP = "charges/registerPaymentTopupRest/";
					var SET_TOPUP = "charges/setTopupRest/";
					var CLOUD_INFO = "line/cloudInfoRest/";
					var CLOUD_UPDATE = "line/cloudManagerRest/";
					var VAP = "customer/getInstallmentSaleRest/";
					var GET_OFFER_TREE = "offer2/getOfferTreeRest/";
					var GET_OFFER_PRODUCTS = "offer2/getOfferProductsRest/";
					var GET_SUMMARY = "order2/getSummaryRest/";
					var GET_LAST_INVOICES = "few/getLastInvoicesRest";
					var SET_CHANGES = "setchanges/setChangesRest";
					var CHANGE_PWD = "user/updateUserRest/";
					var GET_SERVICES_TV = "tvmobile/getServicesTvRest/";
					var SET_SERVICES_TV = "tvmobile/setServicesTvRest/";
					var CHANGE_PIN_TV = "tvmobile/changePinTvRest/";
					var CHANGE_PASSWORD_TV = "tvmobile/changeCredentialsTvRest";
					var GET_PROPERTIES_PASSWORD_TV = "tvmobile/getPropertiesPasswordTvRest";
					var GET_DEVICES_TV = "tvmobile/getDevicesRest";
					var DESACTIVATION_DEVICE_TV = "tvmobile/desactivationDevicesRest";
					var SEND_EMAIL = "notifications/sendEmailRest/";
					var HISTORICO_FACTURAS = "factura/getHistoricoFacturaRest/";
					var VALIDATE_FRIENDS_TO_ZERO_PROMOTION_ME = "offer/validateFriendsToZeroPromotionMemberRest/";
					var GETPUKCODE ="line/getPukCodeRest/";
					var CHANGE_LOCK_SMART_SIM ="line/changeLockSmartSimRest/";
					var REGISTERFSPUSER ="few/registerFspUserRest/";
					var UNREGISTERFSPUSER = "few/unregisterFspUserRest/";
					var SENDSMSNOTIFICATION = "notifications/sendSmsNotificationRest/";
					var GETCLIENT = "few/getClientRest/";
					var MODIFY_FSP_USER ="few/modifyFspUserRest";
					var GET_USER_INFO ="few/getUserInfoRest/";
					var GET_MDG = "mdgRest/rest/mdg/getClientMDGRest/NumeroDocumento/{NIF}/TipoAcceso/MSISDN/Marca/{MARCA}/MSISDN/{MSISDN}";
					var GET_INVOICES = "historico-facturas/billreview/{D1}/numerodocumento/{D2}/customercode/{D3}";
					var GET_DETALLELINEA = "factura/getDetalleLineaRest/";
					//var GET_DETALLELINEAEMP = "factura/getDetalleLineaEmpRest/";
					var GET_DETALLEFACTURA = "factura/getDetalleFacturaRest/";
					//var GET_DETALLEFACTURAEMP = "factura/getDetalleFacturaEmpRest/";					
					var GET_DETALLECONCEPTO = "factura/getDetalleConceptoRest/";
					//var GET_DETALLECONCEPTOEMP = "factura/getDetalleConceptoEmpRest/";		
					var GET_DETALLECONSUMOEMP = "factura/getDetalleConsumoEmpRest/";							
					//var GET_DETALLECONSUMO = "factura/getDetalleConsumoRest/";			

					if (!device) {
						device = {
								platform: "desktop"
						}
					}
					

					function Fail(data, status, headers, config) {
						console.log("**********WebServiceFactory: respuesta FAIL---- "
										+ JSON.stringify(data)
										+ ':status: '
										+ JSON.stringify(status)
										+ ' headers: '
										+ JSON.stringify(headers)
										+ ' WebServiceFactory:config: '
										+ JSON.stringify(config));
					}
					function OK(data, status, headers, config) {
						console.log("**********WebServiceFactory: respuesta OK---- "
										+ JSON.stringify(data)
										+ ':status: '
										+ JSON.stringify(status)
										+ ' headers: '
										+ JSON.stringify(headers)
										+ ' WebServiceFactory:config: '
										+ JSON.stringify(config));
					}

					


					/**
					 * Función encargada de ralizar la llamada a un servicio REST por GET
					 * 
					 * @param Headers
					 *            Cabeceras para incluir en la llamada REST
					 * @param procedure
					 *            Nombre del procedimiento a invocar por REST
					 * @param callbackOk
					 *            Función que se ejecuta si la llamada REST ha ido correctamente
					 * @param CallbackFail
					 *            Función que se ejecuta si se ha producido un error en la llamada REST
					 */
					function GetRest(Headers, procedure, callbackOk,CallbackFail) {
						console.log("**********WebServiceFactory: llamada a URL:" + URL_WEB_SERVICES 	+ procedure);
						console.log("**********					  header: " + JSON.stringify(Headers));
						
						//Modificación de llamadas Servicios ATG
						if(APP_NAME == "miOrangeApp") {
							
							if(Headers == null || Headers == "") {
								
								Headers = {};
							}
							
							Headers.callATG = true;
						}
						
						restApiFactory.get({urlBase : URL_WEB_SERVICES	+ procedure,
											parameters : '',
											timeout : GETREST_TIMEOUT,
											retry : NUM_MAX_REINTENTOS_WS,
											responseType : 'json',
											headers : Headers
										},
										function(data, status, headers, config) {

											console.log("**********WebServiceFactory: respuesta de OK"
															+ procedure
															+ " data: "
															+ JSON.stringify(data));
											
											if (data)
												callbackOk(data, status, headers, 	config);
											else 
												CallbackFail(data, status, headers, config);

										},
										function(data, status, headers, config) {

											console.log("**********WebServiceFactory: respuesta ---- FAIL\ndata:"
															+ JSON.stringify(data)
															+ '\nstatus: '
															+ JSON.stringify(status)
															+ '\nheaders: '
															+ JSON.stringify(headers)
															+ '\nWebServiceFactory:config: '
															+ JSON.stringify(config));
											
											//Comprobamos si el error producido es porque ha caducado la sesión, en ese caso lanzamos un evento para que se reinicie la app
											if(status == STATUS_SESSION_EXPIRED) {
												
												$rootScope.$broadcast("sesionCaducada");
												
											} else {
												CallbackFail(data, status, headers,	config);
											}
											

											// console.log('GidfFactory:
											// getPrivateMenu() Fin
											// onFailure');
										}

								);

					}
					

					
					/**
					 * Función encargada de ralizar la llamada a un servicio REST por POST
					 * 
					 * @param Headers
					 *            Cabeceras para incluir en la llamada REST
					 * @param jsonPetition
					 *            Petición del servicio REST
					 * @param procedure
					 *            Nombre del procedimiento a invocar por REST
					 * @param callbackOk
					 *            Función que se ejecuta si la llamada REST ha ido correctamente
					 * @param CallbackFail
					 *            Función que se ejecuta si se ha producido un error en la llamada REST
					 */
					function PostRest(headers, jsonPetition, procedure,callbackOk, CallbackFail) {
						console.log("**********WebServiceFactory: llamada a "
								+ procedure + "URL:" + URL_WEB_SERVICES
								+ procedure);
						var Headers = {
							'Content-Type' : 'application/json; charset=utf-8'
						};
						if (headers != null && headers != '') {
							Headers = headers;
						}

						//Modificación de llamadas Servicios ATG
						if(APP_NAME == "miOrangeApp") {
							
							Headers.callATG = true;
						}

						restApiFactory.post(
										{
											urlBase : URL_WEB_SERVICES	+ procedure,
											parameters : '',
											timeout : POSTREST_TIMEOUT,
											retry : NUM_MAX_REINTENTOS_WS,
											responseType : 'json',
											headers : Headers
										},
										jsonPetition,
										function(data, status, headers, config) {

											console.log("**********WebServiceFactory: respuesta de "+ procedure	+ " data: "	+ JSON.stringify(data));

											callbackOk(data, status, headers,config);
										},
										function(data, status, headers, config) {

											console.log("**********WebServiceFactory: respuesta ---- "+ JSON.stringify(data)
															+ ':status: '+ JSON.stringify(status)
															+ ' headers: '+ JSON.stringify(headers)
															+ ' WebServiceFactory:config: '+ JSON.stringify(config));
				
				
											//Comprobamos si el error producido es porque ha caducado la sesión, en ese caso lanzamos un evento para que se reinicie la app
											if(status == STATUS_SESSION_EXPIRED) {
												
												$rootScope.$broadcast("sesionCaducada");
												
											} else {
												CallbackFail(data, status, headers,	config);
											}

											// console.log('GidfFactory:
											// getPrivateMenu() Fin
											// onFailure');
										}

								);
						console.log("********** PostRest ---- FIN");
					}
					return {
						/**
						 * Función encargada de obtener la los contadores
						 * 
						 * @param msisdn
						 * @param getReadConfigOK
						 */
						loadProfile : function(user, callBackOk, callBackFail) {
							console.log("********** loadProfile ---- carga perfil para user:" + user);

							var channelType = restApiFactory.getChannelType(device.platform);

							var Headers = {
								'Content-Type' : 'multipart/form-data',
								'Channel' : channelType,
								'Lang' : 'es_ES',
								'Uuid' : user,
								
								'msisdn' : user,
								'segment' : null,
								'customerId' : null,
								'isMigrated' : null,
								'X-WASSUP-CRED-USED' : user,
								'X-WASSUP-CREDTYPE-USED' : 'MSISDN',
								'X-WASSUP-PA1' : user,
								'X-WASSUP-SALTOID' : 'UNAVAILABLE'
								

							};
							//console.log("********** loadProfile ---- llama a GetRest con servicio " + PROFILE);
							GetRest(Headers, PROFILE, callBackOk, callBackFail);

						},
                        /*******************************/
				           loadCurrentBill : function(msisdn, segment, type, successCallback,errorCallback) {
				        	   
				        	   console.log("********** loadCurrentBill ---- Inicio");
				        	   
							/*
							 * type String Valores: “1” /PREPAGO, “2” /POSTPAGO
							 */
							
							var channelType = restApiFactory.getChannelType(device.platform);
							var Headers = {
								'Content-Type' : 'multipart/form-data',
								'Channel' : channelType,
								'Lang' : 'es_ES',
								'Uuid' : msisdn,
								'msisdn' : msisdn,
								'segment' : segment,
								'customerId' : null,
								'X-WASSUP-CRED-USED' : msisdn,
								'X-WASSUP-CREDTYPE-USED' : 'MSISDN',
								'X-WASSUP-PA1' : msisdn,
								'X-WASSUP-SALTOID' : 'UNAVAILABLE'
							};
							GetRest(Headers, USAGE + type, successCallback, Fail);
				
							console.log("********** loadCurrentBill ---- FIN");
							
						},
						/******************************/ 
						   getPukCode : function(request, successCallback,errorCallback) {
				        	   
							   console.log("********** getPukCode ---- Inicio");
							   
								
								
								var channelType = restApiFactory.getChannelType(device.platform);
								var Headers = {
									'Content-Type' : 'multipart/form-data',
									'Channel' : channelType,
									'Lang' : 'es_ES',
									'Uuid' : request.msisdn,
									'msisdn' : request.msisdn,
									'segment' : request.segment,
									'customerId' : request.customerId,
									'X-WASSUP-CRED-USED' : request.msisdn,
									'X-WASSUP-CREDTYPE-USED' : 'MSISDN',
									'X-WASSUP-PA1' : request.msisdn,
									'X-WASSUP-SALTOID' : 'UNAVAILABLE'
								};
								GetRest(Headers, GETPUKCODE, successCallback, errorCallback);
					
								console.log("********** getPukCode ---- FIN");
								
							},
						/******************************/   
						loadMeters : function(request, successCallback,errorCallback) {
							
							console.log("********** loadMeters ---- Inicio");
							

							var channelType = restApiFactory.getChannelType(device.platform);
							
							
							var Headers = {
									'Content-Type' : 'application/json',
									'Channel' : channelType,
									'Lang' : 'es_ES',
									'Uuid' :request. msisdn,
									'msisdn' : request.msisdn,
									'isMigrated' : request.isMigrated,
									'X-WASSUP-CRED-USED' : request.msisdn,
									'X-WASSUP-CREDTYPE-USED' : 'MSISDN',
									'X-WASSUP-PA1' : request.msisdn,
									'X-WASSUP-SALTOID' : 'UNAVAILABLE'
								};

								var jsonRequest = {
									"channel" : channelType,
									"lang" : "es_ES",
									"uuid" : request.msisdn,
									"msisdn" : request.msisdn,
									"segment" : request.segment,
									"customerId" : request.customerId,
									"clearCache" : request.clearCache,
									"invalidateCache" : request.invalidateCache,
									"productTypeArray" : request.productTypeArray,
									"isMigrated" : request.isMigrated
								};
							
								PostRest(Headers, jsonRequest, BALANCE, successCallback, errorCallback);
								
								console.log("********** loadMeters ---- FIN");
								
						},
						/*****************************/
						loadDownloadList : function(msisdn, profile,successCallback, errorCallback) {
							
							console.log("********** loadDownloadList ---- Inicio. MSISDN:"+ msisdn + " PROFILE:" + profile.segment);
							
							var channelType = restApiFactory.getChannelType(device.platform);
							var today = new Date();
							var dd = today.getDate();
							var mm = today.getMonth() + 1; // January is 0!
                           function checkDigits(num){
                        	   if (typeof num=="string"){
                        		   if(parseInt(num)<10 && num.length==1)
                        			   return '0'+num;
                        	   }
                        	   else
                        		   if(num<10 && num.toString().length==1)
                            		   return '0'+num;
                        	   return num		   
                           }
							var yyyy = today.getFullYear();
							dd=checkDigits(dd);
							mm=checkDigits(mm);
							
							// Today
							today = yyyy + "" + mm + "" + dd;
							var startDate = 1;
							var endDate = today;
							// When cicle starts
							if (startDay==null || startDay == false){
								mm=checkDigits(parseInt(mm) - 1);								
								startDate = yyyy + "" + mm + "" + dd;
							}
							else{
								if (dd < startDay) {
									if (mm > 1) {
										mm=checkDigits(parseInt(mm) - 1);	
									} else {
										mm = 12;
										yyyy = yyyy - 1;
									}
									
								}
								mm=checkDigits(mm);
								if (startDay < 10 && startDay.length==1) {
									startDay=checkDigits(startDay);
									
								}
	
								startDate = yyyy + "" + mm + "" + startDay;
							}
							console.log("LoadDownloadListRest entre el: "+ startDate + " y el: " + endDate);
							

						
							var Headers = {
								'Content-Type' : 'application/json',
								'Channel' : channelType,
								'Lang' : 'es_ES',
								'Uuid' :msisdn,
								'msisdn' : msisdn,
								'isMigrated' : profile.isMigrated,
								'X-WASSUP-CRED-USED' : msisdn,
								'X-WASSUP-CREDTYPE-USED' : 'MSISDN',
								'X-WASSUP-PA1' : msisdn,
								'X-WASSUP-SALTOID' : 'UNAVAILABLE'
							};

							var query = {
								"callFlag" : "Y",
								"dataFlag" : "Y",
								"msgFlag" : "Y",
								"originNumber" : msisdn,
								"destinationNumber" : "",
								"startDate" : startDate,
								"endDate" : endDate,
								"minCost" : "",
								"maxCost" : "",
								"numMaxItems" : "",
								"zeroCostMsgFlag" : "Y"
							};

							console.log("Query: " + JSON.stringify(query));
							

							var channelType = restApiFactory.getChannelType(device.platform);

							var jsonRequest = {
								"channel" : channelType,
								"lang" : "es_ES",
								"uuid" : "M" + msisdn,
								"msisdn" : "M" + msisdn,
								"segment" : profile.segment,
								"customerId" : profile.customerId,
								"page" : 1,
								"itemsByPage" : 200,
								"rootSegment" : profile.type,
								"query" : query
							};

							PostRest(Headers, jsonRequest, DOWNLOADLIST,successCallback, errorCallback);
							console.log("********** loadDownloadList ---- FIN");
							
						},
						/************************************/
						loadCustomerInfo : function(msisdn,profile, successCallback,errorCallback) {
							
							console.log("********** loadCustomerInfo ---- Inicio");
							
							if(profile.segment==null)
								profile.segment="DEFAULT"
							var channelType = restApiFactory.getChannelType(device.platform);
							var Headers = {
								'Content-Type' : 'multipart/form-data',
								'Channel' : channelType,
								'Lang' : 'es_ES',
								'Uuid' : msisdn,
								'msisdn' : msisdn,
								'segment' : profile.segment,
								'customerId' : profile.customer.id,
								'isMigrated' : profile.isMigrated,
								'X-WASSUP-CRED-USED' : msisdn,
								'X-WASSUP-CREDTYPE-USED' : 'MSISDN',
								'X-WASSUP-PA1' : msisdn,
								'X-WASSUP-SALTOID' : 'UNAVAILABLE'
							};
							
							console.log("Headers con que invocamos servicio: "+ JSON.stringify(Headers));
							
							GetRest(Headers, CUSTOMERINFO, successCallback,	errorCallback);

							console.log("********** loadCustomerInfo ---- FIN");
							
						},
						
						updateCustomerEmail : function(msisdn, data,successCallback, errorCallback) {

							console.log("customer.atejas3: " + data.customerId);
							

							var channelType = restApiFactory.getChannelType(device.platform);
							// En pro no hace falta meter las xwassup según
							// Emilio
							var Headers = {
									'X-WASSUP-CRED-USED' : msisdn,
									'X-WASSUP-CREDTYPE-USED' : 'MSISDN',
									'X-WASSUP-PA1' : msisdn,
									'X-WASSUP-SALTOID' : 'UNAVAILABLE'
							};

							console.log("Headers: " + Headers);
							
							var jsonRequest = {
								"channel" : channelType,
								"lang" : "es_ES",
								"uuid" : msisdn,
								"msisdn" : msisdn,
								"segment": data.segment,
								"customerId" : data.customerId,
								"clearCache": false,
								"invalidateCache": null,
								"isMigrated": data.isMigrated,
								"customer" : {
									"address" : {
									     "seqNumber": "1",
										"email" : data.email

									}

								},
								"updatedSection": "DATOS_CONTACTO_EMAIL",
								"lowCostFlag": data.lowCostFlag,
								"mensajeOk" : "OK",
								"mensajeKo" : "KO",
								"laorigen": null
							};

							console.log("Json con que invocamos servicio: "	+ JSON.stringify(jsonRequest));
							

							PostRest(Headers, jsonRequest, UPDATECUSTOMERINFO,successCallback, errorCallback);
							console.log("********** updateCustomerEmail ---- FIN");
							

						},
						
						
						updateCustomerPhone : function(msisdn, data,successCallback, errorCallback) {
							var Headers = {
									'X-WASSUP-CRED-USED' : msisdn,
									'X-WASSUP-CREDTYPE-USED' : 'MSISDN',
									'X-WASSUP-PA1' : msisdn,
									'X-WASSUP-SALTOID' : 'UNAVAILABLE'
							};

							var channelType = restApiFactory.getChannelType(device.platform);
							var jsonRequest = {
								"channel" : channelType,
								"lang" : "es_ES",
								"uuid" : msisdn,
								"msisdn" : msisdn,
								"segment": data.segment,
								"customerId" : data.customerId,
								"clearCache": false,
								"invalidateCache": null,
								"isMigrated": data.isMigrated,
								"customer" : {
									"address" : {
									     "seqNumber": "1",
									     "phone1" : data.phone
									}

								},
								"updatedSection": "DATOS_CONTACTO_TELEFONO",
								"lowCostFlag": data.lowCostFlag,
								"mensajeOk" : "OK",
								"mensajeKo" : "KO",
								"laorigen": null
							};

						
							console.log("********** updateCustomerPhone  ---- invoco servicio");
							

							PostRest(Headers, jsonRequest, UPDATECUSTOMERINFO,successCallback, errorCallback);
							console.log("********** updateCustomerPhone ---- FIN");
							

						},

						updateBankAccount : function(msisdn, data,successCallback, errorCallback) {
							var Headers = {
									'X-WASSUP-CRED-USED' : msisdn,
									'X-WASSUP-CREDTYPE-USED' : 'MSISDN',
									'X-WASSUP-PA1' : msisdn,
									'X-WASSUP-SALTOID' : 'UNAVAILABLE'};

							var channelType = restApiFactory.getChannelType(device.platform);

							var jsonRequest = {
								"channel" : channelType,
								"lang" : "es_ES",
								"uuid" : msisdn,
								"msisdn" : msisdn,
								"segment": data.segment,
								"customerId" : data.customerId,
								"clearCache": false,
								"invalidateCache": null,
								"isMigrated": data.isMigrated,
								"customer" : {
									"payment": {
										"bankName": data.bankName,
										"accountNumber": data.accountNumber
										

									}

								},
								"updatedSection": "DATOS_CONTACTO_TELEFONO",
								"lowCostFlag": data.lowCostFlag,
								"mensajeOk" : "OK",
								"mensajeKo" : "KO",
								"laorigen": null
							};

						
							console.log("********** updateBankAccount  ---- invoco servicio");
							

							PostRest(Headers, jsonRequest, UPDATECUSTOMERINFO,successCallback, errorCallback);
							console.log("********** updateBankAccount ---- FIN");
							

						},
						validateEntityBank : function(msisdn, data,	successCallback, errorCallback) {

							var channelType = restApiFactory.getChannelType(device.platform);
							
							var Headers = {
									'X-WASSUP-CRED-USED' : msisdn,
									'X-WASSUP-CREDTYPE-USED' : 'MSISDN',
									'X-WASSUP-PA1' : msisdn,
									'X-WASSUP-SALTOID' : 'UNAVAILABLE'};

							var jsonRequest = {
								"channel" : channelType,
								"lang" : "es_ES",
								"uuid" : msisdn,
								"msisdn" : msisdn,
								"bank" : data.bank,
								"office" : data.office,
								"dc" : data.dc,
								"accNum" : data.accNum

							};

							PostRest(Headers, jsonRequest, VALIDATEENTITYBANK,successCallback, errorCallback);
							console.log("********** validateEntityBank ---- FIN");
							

						},
						normalizeCustomerAddress : function(msisdn, data,successCallback, errorCallback) {

							var channelType = restApiFactory.getChannelType(device.platform);
							
							var Headers = {
									'X-WASSUP-CRED-USED' : msisdn,
									'X-WASSUP-CREDTYPE-USED' : 'MSISDN',
									'X-WASSUP-PA1' : msisdn,
									'X-WASSUP-SALTOID' : 'UNAVAILABLE'};

							var jsonRequest = {
								"channel" : channelType,
								"lang" : "es_ES",
								"uuid" : msisdn,
								"msisdn" : msisdn,
								"street" : data.direccion,
								"streetNum" : data.numero,
								"floor" : data.piso,
								"gate" : data.puerta,
								"staircase" : data.escalera,
								"postalCode" : data.codigoPostal,
								"state" : data.provincia,
								"county" : data.localidad,
								"resultsNum" : 1
							};

							
							
							PostRest(Headers, jsonRequest,NORMALIZECUSTOMERADDRESS, successCallback,errorCallback);
							console.log("********** normalizeCustomerAddress ---- FIN");
							

						},
						
						updateCustomerAddress : function(msisdn, data,successCallback, errorCallback) {
							var channelType = restApiFactory.getChannelType(device.platform);

							console.log("Recibimos: " + JSON.stringify(data));
							

							
							var Headers = {
									'X-WASSUP-CRED-USED' : msisdn,
									'X-WASSUP-CREDTYPE-USED' : 'MSISDN',
									'X-WASSUP-PA1' : msisdn,
									'X-WASSUP-SALTOID' : 'UNAVAILABLE'
							};
							 data.address.seqNumber= "1";
							var jsonRequest = {
									"channel" : channelType,
									"lang" : "es_ES",
									"uuid" : msisdn,
									"msisdn" : msisdn,
									"segment": data.segment,
									"customerId" : data.customerId,
									"clearCache": false,
									"invalidateCache": null,
									"isMigrated": data.isMigrated,
									"customer" : {
										"address" : data.address
										},
									"updatedSection" : "DATOS_CONTACTO_TELEFONO",
									"lowCostFlag" : data.lowCostFlag,
									"mensajeOk" : "OK",
									"mensajeKo" : "KO",
									"laorigen" : null
								

							};

							console.log("Json con que invocamos servicio: "+ JSON.stringify(jsonRequest));
							

							console.log("********** updateCustomerAddress  ---- invoco servicio");
							

							PostRest(Headers, jsonRequest, UPDATECUSTOMERINFO,	successCallback, errorCallback);
							console.log("********** updateCustomerAddress ---- FIN");
							

						},
						/**
						 * Anticipo de saldo
						 * @param msisdn MSISDN del que solicita el servicio
						 * @param amount Cantidad que se solicita
						 * @param successCallback Callback para el OK
						 * @param errorCallback Callback para el KO
						 */
						setCreditAdvance : function(msisdn,data,successCallback, errorCallback) {

							console.log("********** setCreditAdvance  ---- Anticipo de saldo");
							

							var channelType = restApiFactory.getChannelType(device.platform);
							
							channelType = channelType == undefined ? 101 : channelType;
							console.log("********** setCreditAdvance ---- Anticipo de saldo channel: " + channelType);
							
							
							var Headers = {
								 'Content-Type' : 'application/json',
								 'Channel' : channelType,
								 'Lang' : 'es_ES',
								 'Uuid' : msisdn,
								 'msisdn' : msisdn,
								 'isMigrated' : data.isMigrated,
								 'X-WASSUP-CRED-USED' : msisdn,
								 'X-WASSUP-CREDTYPE-USED' : 'MSISDN',
								 'X-WASSUP-PA1' : msisdn,
								 'X-WASSUP-SALTOID' : 'UNAVAILABLE'
							};

							var jsonRequest = {
								"channel" : channelType,
								"lang" : "es_ES",
								"uuid" : msisdn,
								"msisdn" : msisdn,
								"segment": data.segment,
								"customerId" : data.customerId,
								"topup" : {
									"msisdn" : msisdn,
									"amount" : ""+data.amount
								}
							};

							PostRest(Headers, jsonRequest, SETCREDITADVANCE,successCallback, errorCallback);

						},
						/**
						 * Traspaso de saldo
						 * @param msisdn MSISDN del que realiza la operación
						 * @param beneficiaryMsisdn MSISDN que reicibirá el traspaso
						 * @param amount Cantidad a traspasar
						 * @param successCallback Callback para el OK
						 * @param errorCallback Callback para el KO
						 */
						transferBalance : function(msisdn, data,amount, successCallback, errorCallback) {

							console.log("********** transferBalance  ---- Traspaso de saldo");
							

							var channelType = restApiFactory.getChannelType(device.platform);
							
							channelType = channelType == undefined ? 101 : channelType;
							console.log("********** setCreditAdvance ---- Anticipo de saldo channel: " + channelType);
							
							
							var Headers = {
								 'Content-Type' : 'application/json',
								 'Channel' : channelType,
								 'Lang' : 'es_ES',
								 'Uuid' : msisdn,
								 'msisdn' : msisdn,								 
								 'isMigrated' : data.isMigrated,
								 'X-WASSUP-CRED-USED' : msisdn,
								 'X-WASSUP-CREDTYPE-USED' : 'MSISDN',
								 'X-WASSUP-PA1' : msisdn,
								 'X-WASSUP-SALTOID' : 'UNAVAILABLE'
							};

							var jsonRequest = {
								"channel" : channelType,
								"lang" : "es_ES",
								"uuid" : msisdn,
								"msisdn" : msisdn,
								"segment": data.segment,
								"customerId" : data.customerId,
								"beneficiaryMSISDN" : data.beneficiaryMsisdn,
								"amount" : amount
							};

							PostRest(Headers, jsonRequest, TRANSFERBALANCE,successCallback, errorCallback);

						},
						/**
						 * Solicitud de traspaso de saldo
						 * @param msisdn MSISDN del usuario que solicita el servicio
						 * @param donatorMsisdn MSISDN al que se solicita el traspaso
						 * @param successCallback Callback para el OK
						 * @param errorCallback Callback para el KO
						 */
						askForBalance : function(msisdn, donatorMsisdn,successCallback, errorCallback) {

							console.log("********** askForBalance  ---- Solicitud de traspaso de saldo");

							var channelType = restApiFactory.getChannelType(device.platform);
							
							channelType = channelType == undefined ? 101 : channelType;
							console.log("********** setCreditAdvance ---- Solicitud de traspaso de saldo channel: " + channelType);
							
								
							var Headers = {
								'Content-Type' : 'application/json',
								'Channel' : channelType,
								'Lang' : 'es_ES',
								'Uuid' : msisdn,
								'msisdn' : msisdn,
								'segment' : "DEFAULT",
								'customerId' : msisdn,
								'X-WASSUP-CRED-USED' : msisdn,
								'X-WASSUP-CREDTYPE-USED' : 'MSISDN',
								'X-WASSUP-PA1' : msisdn,
								'X-WASSUP-SALTOID' : 'UNAVAILABLE'
							};

							GetRest(Headers, ASKFORBALANCE + donatorMsisdn,successCallback, errorCallback);

						},
						/**
						 * Para obtener Más Megas
						 */
						getProducts : function(request, successCallback, errorCallback) {

							console.log("********** getProducts  ---- Obtención de productos");
							

							var channelType = restApiFactory.getChannelType(device.platform);
							var Headers = {
								'Content-Type' : 'application/json',
								'Channel' : channelType,
								'Lang' : 'es_ES',
								'Uuid' :request. msisdn,
								'msisdn' : request.msisdn,
								'isMigrated' : request.isMigrated,
								'X-WASSUP-CRED-USED' : request.msisdn,
								'X-WASSUP-CREDTYPE-USED' : 'MSISDN',
								'X-WASSUP-PA1' : request.msisdn,
								'X-WASSUP-SALTOID' : 'UNAVAILABLE'
							};

							var jsonRequest = {
								"channel" : channelType,
								"lang" : "es_ES",
								"uuid" : request.msisdn,
								"msisdn" : request.msisdn,
								"segment" : request.segment,
								"customerId" : request.customerId,
								"clearCache" : request.clearCache,
								"invalidateCache" : request.invalidateCache,
								"productIdArray" : request.productIdArray,
								"typologies" : request.typologies,
								"talkplanTypeID" : request.talkplanTypeID,
								"talkplanSubTypeID" : request.talkplanSubTypeID,
								"isMigrated" : request.isMigrated

							};

							PostRest(Headers, jsonRequest, CONSULTINGSERVICE,successCallback, errorCallback);

						},
						
						/**
						 * Activa o desactiva servicios de red de una línea
						 * 
						 * @param request Objeto con los datos para realizar la petición
						 * @param successCallback Función que se ejecuta cuando la llamada al WS se ha realizado correctamente
						 * @param errorCallback Función que se ejecuta cuando se ha producido algún error en la llamada al WS
						 * 
						 */
						setSyncNetworkServices : function(request, successCallback, errorCallback) {

							var channelType = restApiFactory.getChannelType(device.platform);
							
							// En pro no hace falta meter las xwassup según
							// Emilio
							var Headers = {
								'Content-Type' : 'application/json',
								'Channel' : channelType,
								'Lang' : 'es_ES',
								'Uuid' : request.msisdn,
								'msisdn' : request.msisdn,
								'customerId' : request.customerId,
								'isMigrated' : null,
								'X-WASSUP-CRED-USED' : request.msisdn,
								'X-WASSUP-CREDTYPE-USED' : 'MSISDN',
								'X-WASSUP-PA1' : request.msisdn,
								'X-WASSUP-SALTOID' : 'UNAVAILABLE'
							};

							var jsonRequest = {
								"channel" : channelType,
								"lang" : "es_ES",
								"uuid" : request.msisdn,
								"msisdn" : request.msisdn,
								"segment" : request.segment,
								"customerId" : request.customerId,
								"processType" : "SERVICE",
								"installedBase" : request.installedBase,
								"orderLines" : request.orderLines
							};

							PostRest(Headers, jsonRequest, SET_ORDER, successCallback, errorCallback);
							console.log("********** setSyncNetworkServices ---- FIN");
							
						},
						
						/**
						 * Activa o desactiva servicios de red de una línea de forma ASINCRONA
						 * 
						 * @param request Objeto con los datos para realizar la petición
						 * @param successCallback Función que se ejecuta cuando la llamada al WS se ha realizado correctamente
						 * @param errorCallback Función que se ejecuta cuando se ha producido algún error en la llamada al WS
						 * 
						 */
						setAsyncNetworkServices : function(request, successCallback, errorCallback) {

							var channelType = restApiFactory.getChannelType(device.platform);
							
							// En pro no hace falta meter las xwassup según
							// Emilio
							var Headers = {
								'Content-Type' : 'application/json',
								'Channel' : channelType,
								'Lang' : 'es_ES',
								'Uuid' : request.msisdn,
								'msisdn' : request.msisdn,
								'customerId' : request.customerId,
								'isMigrated' : request.isMigrated,
								'X-WASSUP-CRED-USED' : request.msisdn,
								'X-WASSUP-CREDTYPE-USED' : 'MSISDN',
								'X-WASSUP-PA1' : request.msisdn,
								'X-WASSUP-SALTOID' : 'UNAVAILABLE'
							};

							var jsonRequest = {
								"channel" : channelType,
								"lang" : "es_ES",
								"uuid" : request.msisdn,
								"msisdn" : request.msisdn,
								"segment" : request.segment,
								"customerId" : request.customerId,
								"processType" : "SERVICE",
								"installedBase" : request.installedBase,
								"orderLines" : request.orderLines,
								"isMigrated" : request.isMigrated,
							};

							PostRest(Headers, jsonRequest, SET_ORDER_ASYNC, successCallback, errorCallback);
							console.log("********** setAsyncNetworkServices ---- FIN");
							
						},
						
						/**
						 * Primer paso para recargar tarjeta
						 * @param request contiene datos necesarios para la llamada al servicio
						 * @param successCallback función que se ejecuta cuando el servicio devuelve un OK
						 * @param errorCallback función que se ejecuta cuando el servicio devuelve un KO
						 */
						registerPaymentTopup : function(request, successCallback, errorCallback){
							
							console.log("********** registerPaymentToupup ---- INICIO");
							
							var channelType = restApiFactory.getChannelType(device.platform);
							
							var Headers = {
								'Content-Type' : 'application/json',
								'Channel' : channelType,
								'Lang' : 'es_ES',
								'Uuid' : request.msisdn,
								'msisdn' : request.msisdn,
								'customerId' : request.msisdn,
								'isMigrated' : request.isMigrated,
								'X-WASSUP-CRED-USED' : request.msisdn,
								'X-WASSUP-CREDTYPE-USED' : 'MSISDN',
								'X-WASSUP-PA1' : request.msisdn,
								'X-WASSUP-SALTOID' : 'UNAVAILABLE'
							};
							
							var jsonRequest = {
								"channel" : channelType,
								"lang" : "es_ES",
								"uuid" : request.msisdn,
								"msisdn" : request.msisdn,
								"segment" : "DEFAULT",
								"customerId" : "MOBILE",
								"query":{
									"custCode": request.custCode,
									"customerId": "",
									"shop":"000000000003543",
									"termId":"00000006",
									"track2": request.track2,
									"amount": request.amount,
									"smsPhone": request.msisdn
								}
							};
							
							PostRest(Headers, jsonRequest, REGISTER_PAYMENT_TOPUP, successCallback, errorCallback);							
							console.log("********** registerPaymentToupup ---- FIN");
							
						},
						
						/**
						 * Realizar pago estandar
						 * @param request contiene datos necesarios para la llamada al servicio
						 * @param successCallback función que se ejecuta cuando el servicio devuelve un OK
						 * @param errorCallback función que se ejecuta cuando el servicio devuelve un KO
						 */
						setTopup : function(request, successCallback, errorCallback){
							
							console.log("********** setTopup ---- INICIO");
							
							var channelType = restApiFactory.getChannelType(device.platform);
							
							var Headers = {
									'Content-Type' : 'application/json',
									'Channel' : channelType,
									'Lang' : 'es_ES',
									'Uuid' : request.msisdn,
									'msisdn' : request.msisdn,
									'customerId' : request.msisdn,
									'isMigrated' : request.isMigrated,
									'X-WASSUP-CRED-USED' : request.msisdn,
									'X-WASSUP-CREDTYPE-USED' : 'MSISDN',
									'X-WASSUP-PA1' : request.msisdn,
									'X-WASSUP-SALTOID' : 'UNAVAILABLE'
								};
							
							var jsonRequest = {
								"channel" : channelType,
								"lang" : "es_ES",
								"uuid" : request.msisdn,
								"msisdn" : request.msisdn,
								"segment" : "DEFAULT",
								"topup": request.topup,
								"paymentMethod" : request.paymentMethod,
								"paymentData" : request.paymentData
							};
							
							PostRest(Headers, jsonRequest, SET_TOPUP, successCallback, errorCallback);							
							console.log("********** setTopup ---- FIN");
							
						},

						/**
						 * Devuelve la información relacionada con Orange Cloud para una línea determinada
						 * 
						 * @param request
						 *            Objeto con los datos de la petición
						 * @param callBackOk
						 *            Función que se ejecuta cuando la llamada al WS se ha realizado correctamente
						 * @param callBackFail
						 *            Función que se ejecuta cuando se ha producido algún error en la llamada al WS
						 */
						cloudInfo : function(request, callBackOk, callBackFail) {
							
							console.log("********** cloudInfo ---- Inicio");
							

							var channelType = restApiFactory.getChannelType(device.platform);

							var Headers = {
								'Content-Type' : 'multipart/form-data',
								'Channel' : channelType,
								'Lang' : 'es_ES',
								'Uuid' : request.msisdn,
								'msisdn' : request.msisdn,
								'segment' : request.segment,
								'customerId' : request.customerId,
								'isMigrated' : request.isMigrated,
								'X-WASSUP-CRED-USED' : request.msisdn,
								'X-WASSUP-CREDTYPE-USED' : 'MSISDN',
								'X-WASSUP-SALTOID' : 'UNAVAILABLE'
							};
							
							var parameters = "firstLevelRateProductId/" + request.firstLevelRateProductId + "/secondLevelRateProductId/" + request.secondLevelRateProductId;
							
							GetRest(Headers, CLOUD_INFO + parameters, callBackOk, callBackFail);
							
							console.log("********** cloudInfo ---- FIN");
							
						},
						

						/**
						 * Activa o desactiva los servicios de Orange Cloud
						 * 
						 * @param request
						 *            Objeto con los datos para realizar la petición
						 * @param successCallback
						 *            Función que se ejecuta cuando la llamada al WS se ha realizado correctamente
						 * @param errorCallback
						 *            Función que se ejecuta cuando se ha producido algún error en la llamada al WS
						 * 
						 */
						cloudUpdate : function(request, successCallback, errorCallback) {

							var channelType = restApiFactory.getChannelType(device.platform);
							
							// En pro no hace falta meter las xwassup según
							// Emilio
							var Headers = {
								'Content-Type' : 'application/json',
								'Channel' : channelType,
								'Lang' : 'es_ES',
								'Uuid' : request.msisdn,
								'msisdn' : request.msisdn,
								'customerId' : request.customerId,
								'isMigrated' : request.isMigrated,
								'X-WASSUP-CRED-USED' : request.msisdn,
								'X-WASSUP-CREDTYPE-USED' : 'MSISDN',
								'X-WASSUP-PA1' : request.msisdn,
								'X-WASSUP-SALTOID' : 'UNAVAILABLE'
							};
							if(request.segment==null)
								request.segment="DEFAULT";
							var jsonRequest = {
								"channel" : channelType,
								"lang" : "es_ES",
								"uuid" : request.msisdn,
								"msisdn" : request.msisdn,
								"segment" : request.segment,
								"customerId" : request.customerId,
								"isMigrated" : request.isMigrated,
								"productId" : request.productId,
								"action" : request.action
							};

							PostRest(Headers, jsonRequest, CLOUD_UPDATE, successCallback, successCallback);
							console.log("********** cloudUpdate ---- FIN");
							
						},
						/**
						 * Para obtener todos los datos de la venta a plazos de un cliente
						 */
						getVap : function(request, successCallback, errorCallback) {

							console.log("********** getVap  ---- Obtención de venta a plazos");
							

							var channelType = restApiFactory.getChannelType(device.platform);
							var Headers = {
								'Content-Type' : 'application/json',
								'Channel' : channelType,
								'Lang' : 'es_ES',
								'Uuid' :request. msisdn,
								'msisdn' : request.msisdn,
								'customerId': request.customerId,
								'isMigrated' : request.isMigrated,
								'X-WASSUP-CRED-USED' : request.msisdn,
								'X-WASSUP-CREDTYPE-USED' : 'MSISDN',
								'X-WASSUP-PA1' : request.msisdn,
								'X-WASSUP-SALTOID' : 'UNAVAILABLE'
							};
							if(request.segment==null)
								request.segment="DEFAULT";
							var jsonRequest = {
								"channel" : channelType,
								"lang" : "es_ES",
								"uuid" : request.msisdn,
								"msisdn" : request.msisdn,
								"segment" : request.segment,
								"customerId": request.customerId,
								"isMigrated": request.isMigrated,
								"clearCache": false,
								"installmentSaleData": {
									"msisdn": request.msisdn
								}
							};

							PostRest(Headers, jsonRequest, VAP,successCallback, errorCallback);

						},
						
						/**
						 * Obtiene el árbol de ofertas
						 * 
						 * @param request
						 *            Objeto con los datos para realizar la petición
						 * @param successCallback
						 *            Función que se ejecuta cuando la llamada al WS se ha realizado correctamente
						 * @param errorCallback
						 *            Función que se ejecuta cuando se ha producido algún error en la llamada al WS
						 * 
						 */
						getOfferTree : function(request, successCallback, errorCallback) {

							console.log("********** getOfferTree  ---- Obtención de productos");
							

							var channelType = restApiFactory.getChannelType(device.platform);
							
							var Headers = {
								'Content-Type' : 'application/json',
								'Channel' : channelType,
								'Lang' : 'es_ES',
								'Uuid' :request. msisdn,
								'msisdn' : request.msisdn,
								'customerId' : request.customerId,
								'isMigrated' : request.isMigrated,
								'X-WASSUP-CRED-USED' : request.msisdn,
								'X-WASSUP-CREDTYPE-USED' : 'MSISDN',
								'X-WASSUP-PA1' : request.msisdn,
								'X-WASSUP-SALTOID' : 'UNAVAILABLE'
							};
							if(request.segment==null)
								request.segment="DEFAULT";
							var jsonRequest = {
								"channel" : channelType,
								"lang" : "es_ES",
								"uuid" : request.msisdn,
								"msisdn" : request.msisdn,
								"segment" : request.segment,
								"customerId" : request.customerId,
								"typologies" : request.typologies,
								"invalidateCache" : request.invalidateCache,
								"discardErrors" : request.discardErrors,
								"multiline" : request.multiline,
								"partyType" : request.partyType,
								"type" : request.type,
								"hybrid" : request.hybrid,
								"talkplanId" : request.talkplanId,
								"installedTalkplanId" : request.installedTalkplanId,
								"installable" : request.installable,
								"installed" : request.installed,
								"isMigrated" : request.isMigrated
							};

							PostRest(Headers, jsonRequest, GET_OFFER_TREE, successCallback, errorCallback);

						},
						
						/**
						 * Recupera la oferta de un cliente
						 * 
						 * @param request
						 *            Objeto con los datos para realizar la petición
						 * @param successCallback
						 *            Función que se ejecuta cuando la llamada al WS se ha realizado correctamente
						 * @param errorCallback
						 *            Función que se ejecuta cuando se ha producido algún error en la llamada al WS
						 * 
						 */
						getOfferProducts : function(request, successCallback, errorCallback) {

							console.log("********** getOfferProducts  ---- Obtención de productos");
							

							var channelType = restApiFactory.getChannelType(device.platform);
							
							var Headers = {
								'Content-Type' : 'application/json',
								'Channel' : channelType,
								'Lang' : 'es_ES',
								'Uuid' :request. msisdn,
								'msisdn' : request.msisdn,
								'customerId' : request.customerId,
								'isMigrated' : request.isMigrated,
								'X-WASSUP-CRED-USED' : request.msisdn,
								'X-WASSUP-CREDTYPE-USED' : 'MSISDN',
								'X-WASSUP-PA1' : request.msisdn,
								'X-WASSUP-SALTOID' : 'UNAVAILABLE'
							};
							if(request.segment==null)
								request.segment="DEFAULT";
							
							var jsonRequest = {
								"channel" : channelType,
								"lang" : "es_ES",
								"uuid" : request.msisdn,
								"msisdn" : request.msisdn,
								"segment" : request.segment,
								"customerId" : request.customerId,
								"clearCache" : request.clearCache,
								"invalidateCache" : request.invalidateCache,
								"talkplanId" : request.talkplanId,
								"dataplanId" : request.dataplanId,
								"installedTalkplanId" : request.installedTalkplanId,
								"discardErrors" : request.discardErrors,
								"installed" : request.installed,
								"typologies" : request.typologies,
								"multiline" : request.multiline,
								"hybrid" : request.hybrid,
								"partyType" : request.partyType,
								"type" : request.type,
								"productIdArray" : request.productIdArray,
								"isMigrated" : request.isMigrated
							};

							PostRest(Headers, jsonRequest, GET_OFFER_PRODUCTS, successCallback, errorCallback);
						},
						/**
						 * Recupera el coste de la modificación de la oferta comercial contratada
						 * 
						 * @param request
						 *            Objeto con los datos para realizar la petición
						 * @param successCallback
						 *            Función que se ejecuta cuando la llamada al WS se ha realizado correctamente
						 * @param errorCallback
						 *            Función que se ejecuta cuando se ha producido algún error en la llamada al WS
						 * 
						 */
						getSummary : function(request, successCallback, errorCallback) {

							console.log("********** getOfferTree  ---- Obtención de productos");
							

							var channelType = restApiFactory.getChannelType(device.platform);
							
							var Headers = {
								'Content-Type' : 'application/json',
								'Channel' : channelType,
								'Lang' : 'es_ES',
								'Uuid' :request. msisdn,
								'msisdn' : request.msisdn,
								'isMigrated' : request.isMigrated,
								'X-WASSUP-CRED-USED' : request.msisdn,
								'X-WASSUP-CREDTYPE-USED' : 'MSISDN',
								'X-WASSUP-PA1' : request.msisdn,
								'X-WASSUP-SALTOID' : 'UNAVAILABLE'
							};
							if(request.segment==null)
								request.segment="DEFAULT";
							var jsonRequest = {
								"channel" : channelType,
								"lang" : "es_ES",
								"uuid" : request.msisdn,
								"msisdn" : request.msisdn,
								"segment" : request.segment,
								"customerId" : request.customerId,
								"clearCache" : request.clearCache,
								"invalidateCache" : request.invalidateCache,
								"installedBase" : request.installedBase,
								"orderLines" : request.orderLines,
								"isMigrated" : request.isMigrated
							};

							PostRest(Headers, jsonRequest, GET_SUMMARY, successCallback, errorCallback);
						},
						
						/**
						 * 
						 * Recupera las seis ultimas facturas de un cliente
						 * 
						 */
						getSixLastBills : function(request, successCallback, errorCallback) {

							console.log("********** getSixLastBills  ---- Obtención de las seis ultimas facturas");
							

							var channelType = restApiFactory.getChannelType(device.platform);
							var Headers = {
								'Content-Type' : 'application/json',
								'Channel' : channelType,
								'Lang' : 'es_ES',
								'Uuid' :request. msisdn,
								'msisdn' : request.msisdn,
								'isMigrated' : request.isMigrated,
								'X-WASSUP-CRED-USED' : request.msisdn,
								'X-WASSUP-CREDTYPE-USED' : 'MSISDN',
								'X-WASSUP-PA1' : request.msisdn,
								'X-WASSUP-SALTOID' : 'UNAVAILABLE'
							};
							if(request.segment==null)
								request.segment="DEFAULT";
							
							if(request.tipo == "movil"){
								var idInvoice=[];
								idInvoice.push(request.idInvoice);
								var jsonRequest = {
									"channel" : channelType,
									"lang" : "es_ES",
									"uuid" : request.msisdn,
									"msisdn" : request.msisdn,
									"segment" : request.segment,
									"idInvoice":idInvoice,
									"nInvoces":"6"
	
								};
							}
							else {
								var idInvoice=[];
								idInvoice.push(request.idInvoice);
								var jsonRequest = {
										"channel" : channelType,
										"lang" : "es_ES",
										"uuid" : request.msisdn,
										"msisdn" : request.msisdn,
										"segment" : request.segment,
										"idInvoiceFijo":idInvoice,
										"nInvoces":"6"
		
									};
							}

							PostRest(Headers, jsonRequest, GET_LAST_INVOICES,successCallback, errorCallback);

						},
						
						/**
						 * Recupera el coste de la modificación de la oferta comercial contratada
						 * 
						 * @param request
						 *            Objeto con los datos para realizar la petición
						 * @param successCallback
						 *            Función que se ejecuta cuando la llamada al WS se ha realizado correctamente
						 * @param errorCallback
						 *            Función que se ejecuta cuando se ha producido algún error en la llamada al WS
						 * 
						 */
						setChanges : function(request, successCallback, errorCallback) {

							console.log("********** getOfferTree  ---- Obtención de productos");
							

							var channelType = restApiFactory.getChannelType(device.platform);
							
							var Headers = {
								'Content-Type' : 'application/json',
								'Channel' : channelType,
								'Lang' : 'es_ES',
								'Uuid' :request. msisdn,
								'msisdn' : request.msisdn,
								'isMigrated' : request.isMigrated,
								'X-WASSUP-CRED-USED' : request.msisdn,
								'X-WASSUP-CREDTYPE-USED' : 'MSISDN',
								'X-WASSUP-PA1' : request.msisdn,
								'X-WASSUP-SALTOID' : 'UNAVAILABLE'
							};
							if(request.segment==null)
								request.segment="DEFAULT";
							var jsonRequest = {
								"channel" : channelType,
								"lang" : "es_ES",
								"uuid" : request.msisdn,
								"msisdn" : request.msisdn,
								"segment" : request.segment,
								"customerId" : request.customerId,
								"clearCache" : request.clearCache,
								"invalidateCache" : request.invalidateCache,
								"processId" : request.processId,
								"processType" : request.processType,
								"installedBase" : request.installedBase,
								"orderLines" : request.orderLines,
								"lowCostFlag" : request.lowCostFlag,
								"enqueueRequestFlag" : request.enqueueRequestFlag,
								'isMigrated' : request.isMigrated
							};

							PostRest(Headers, jsonRequest, SET_CHANGES, successCallback, errorCallback);

						},
						
						/**
						 * Devuelve los servicios contratados y contratables de Orange TV para una línea determinada
						 * 
						 * @param request
						 *            Objeto con los datos de la petición
						 * @param callBackOk
						 *            Función que se ejecuta cuando la llamada al WS se ha realizado correctamente
						 * @param callBackFail
						 *            Función que se ejecuta cuando se ha producido algún error en la llamada al WS
						 */
						getServicesTv : function(request, callBackOk, callBackFail) {
							
							console.log("********** getServicesTv ---- Inicio");
							

							var channelType = restApiFactory.getChannelType(device.platform);

							var Headers = {
								'Content-Type' : 'multipart/form-data',
								'Channel' : channelType,
								'Lang' : 'es_ES',
								'Uuid' : request.msisdn,
								'msisdn' : request.msisdn,
								'segment' : null,
								'customerId' : request.customerId,
								'isMigrated' : request.isMigrated,
								'X-WASSUP-CRED-USED' : request.msisdn,
								'X-WASSUP-CREDTYPE-USED' : 'MSISDN',
								'X-WASSUP-SALTOID' : 'UNAVAILABLE'
							};
							
							var parameters = "firstLevelRateProductId/" + request.firstLevelRateProductId + "/secondLevelRateProductId/" + request.secondLevelRateProductId;
							
							GetRest(Headers, GET_SERVICES_TV + parameters, callBackOk, callBackFail);
							console.log("********** getServicesTv ---- FIN");
							
						},
						
						/**
						 * Activa los canales de Orange TV
						 * 
						 * @param request
						 *            Objeto con los datos para realizar la petición
						 * @param successCallback
						 *            Función que se ejecuta cuando la llamada al WS se ha realizado correctamente
						 * @param errorCallback
						 *            Función que se ejecuta cuando se ha producido algún error en la llamada al WS
						 * 
						 */
						setServicesTv : function(request, successCallback, errorCallback) {

							console.log("********** getOfferTree  ---- Obtención de productos");
							

							var channelType = restApiFactory.getChannelType(device.platform);
							
							var Headers = {
								'Content-Type' : 'application/json',
								'Channel' : channelType,
								'Lang' : 'es_ES',
								'Uuid' :request. msisdn,
								'msisdn' : request.msisdn,
								'isMigrated' : request.isMigrated,
								'X-WASSUP-CRED-USED' : request.msisdn,
								'X-WASSUP-CREDTYPE-USED' : 'MSISDN',
								'X-WASSUP-PA1' : request.msisdn,
								'X-WASSUP-SALTOID' : 'UNAVAILABLE'
							};
							if(request.segment==null)
								request.segment="DEFAULT";
							var jsonRequest = {
								"channel" : channelType,
								"lang" : "es_ES",
								"uuid" : request.msisdn,
								"msisdn" : request.msisdn,
								"segment" : request.segment,
								"customerId" : request.customerId,
								"isMigrated" : request.isMigrated,
								"clearCache" : request.clearCache,
								"invalidateCache" : request.invalidateCache,
								"datosFijos" : request.datosFijos,
								"datosCliente" : request.datosCliente,
								"datosServicio" : request.datosServicio
							};

							PostRest(Headers, jsonRequest, SET_SERVICES_TV, successCallback, errorCallback);
							
						},
						
						/**
						 * Cambia el PIN de Orange TV
						 * 
						 * @param request
						 *            Objeto con los datos para realizar la petición
						 * @param successCallback
						 *            Función que se ejecuta cuando la llamada al WS se ha realizado correctamente
						 * @param errorCallback
						 *            Función que se ejecuta cuando se ha producido algún error en la llamada al WS
						 * 
						 */
						changePinTv : function(request, successCallback, errorCallback) {

							console.log("********** changePinTv  ---- Cambio de PIN de Orange TV");
							

							var channelType = restApiFactory.getChannelType(device.platform);
							
							var Headers = {
								'Content-Type' : 'application/json',
								'Channel' : channelType,
								'Lang' : 'es_ES',
								'Uuid' :request. msisdn,
								'msisdn' : request.msisdn,
								'isMigrated' : request.isMigrated,
								'X-WASSUP-CRED-USED' : request.msisdn,
								'X-WASSUP-CREDTYPE-USED' : 'MSISDN',
								'X-WASSUP-PA1' : request.msisdn,
								'X-WASSUP-SALTOID' : 'UNAVAILABLE'
							};
							if(request.segment==null)
								request.segment="DEFAULT";
							var jsonRequest = {
								"channel" : channelType,
								"lang" : "es_ES",
								"uuid" : request.msisdn,
								"msisdn" : request.msisdn,
								"segment" : request.segment,
								"customerId" : request.customerId,
								"isMigrated" : request.isMigrated,
								"clearCache" : request.clearCache,
								"invalidateCache" : request.invalidateCache,
								"memberIdentifier" : request.memberIdentifier,
								"member" : request.member
							};

							PostRest(Headers, jsonRequest, CHANGE_PIN_TV, successCallback, errorCallback);

						},
						
						/**
						 * Cambia la contraseña de Orange TV
						 * 
						 * @param request
						 *            Objeto con los datos para realizar la petición
						 * @param successCallback
						 *            Función que se ejecuta cuando la llamada al WS se ha realizado correctamente
						 * @param errorCallback
						 *            Función que se ejecuta cuando se ha producido algún error en la llamada al WS
						 * 
						 */
						changePasswordTv : function(request, successCallback, errorCallback) {

							console.log("********** changePasswordTv  ---- Cambio de contraseña de Orange TV");
							

							var channelType = restApiFactory.getChannelType(device.platform);
							
							var Headers = {
								'Content-Type' : 'application/json',
								'Channel' : channelType,
								'Lang' : 'es_ES',
								'Uuid' :request. msisdn,
								'msisdn' : request.msisdn,
								'isMigrated' : request.isMigrated,
								'X-WASSUP-CRED-USED' : request.msisdn,
								'X-WASSUP-CREDTYPE-USED' : 'MSISDN',
								'X-WASSUP-PA1' : request.msisdn,
								'X-WASSUP-SALTOID' : 'UNAVAILABLE'
							};
							if(request.segment==null)
								request.segment="DEFAULT";
							var jsonRequest = {
								"channel" : channelType,
								"lang" : "es_ES",
								"uuid" : request.msisdn,
								"msisdn" : request.msisdn,
								"segment" : request.segment,
								"customerId" : request.customerId,
								"isMigrated" : request.isMigrated,
								"clearCache" : request.clearCache,
								"invalidateCache" : request.invalidateCache,
								"household" : request.household
							};

							PostRest(Headers, jsonRequest, CHANGE_PASSWORD_TV, successCallback, errorCallback);

						},
						
						/**
						 * Devuelve las propiedades de la contraseña de Orange TV
						 * 
						 * @param request
						 *            Objeto con los datos de la petición
						 * @param callBackOk
						 *            Función que se ejecuta cuando la llamada al WS se ha realizado correctamente
						 * @param callBackFail
						 *            Función que se ejecuta cuando se ha producido algún error en la llamada al WS
						 */
						getPropertiesPasswordTv : function(request, callBackOk, callBackFail) {
							
							console.log("********** getPropertiesPasswordTv ---- Inicio");
							

							var channelType = restApiFactory.getChannelType(device.platform);

							var Headers = {
								'Content-Type' : 'multipart/form-data',
								'Channel' : channelType,
								'Lang' : 'es_ES',
								'Uuid' : request.msisdn,
								'msisdn' : request.msisdn,
								'segment' : request.segment,
								'customerId' : request.customerId,
								'isMigrated' : request.isMigrated,
								'X-WASSUP-CRED-USED' : request.msisdn,
								'X-WASSUP-CREDTYPE-USED' : 'MSISDN',
								'X-WASSUP-SALTOID' : 'UNAVAILABLE'
							};
							
							GetRest(Headers, GET_PROPERTIES_PASSWORD_TV, callBackOk, callBackFail);
							
							console.log("********** getServicesTv ---- FIN");
							
						},
						
						/**
						 * Devuelve los dispositivos conectados a Orange TV
						 * 
						 * @param request
						 *            Objeto con los datos de la petición
						 * @param callBackOk
						 *            Función que se ejecuta cuando la llamada al WS se ha realizado correctamente
						 * @param callBackFail
						 *            Función que se ejecuta cuando se ha producido algún error en la llamada al WS
						 */
						getDevicesTv : function(request, callBackOk, callBackFail) {
							
							console.log("********** getDevicesTv ---- Inicio");
							

							var channelType = restApiFactory.getChannelType(device.platform);

							var Headers = {
								'Content-Type' : 'multipart/form-data',
								'Channel' : channelType,
								'Lang' : 'es_ES',
								'Uuid' : request.msisdn,
								'msisdn' : request.msisdn,
								'segment' : request.segment,
								'customerId' : request.customerId,
								'isMigrated' : request.isMigrated,
								'X-WASSUP-CRED-USED' : request.msisdn,
								'X-WASSUP-CREDTYPE-USED' : 'MSISDN',
								'X-WASSUP-SALTOID' : 'UNAVAILABLE'
							};
							
							GetRest(Headers, GET_DEVICES_TV, callBackOk, callBackFail);
						
							console.log("********** getServicesTv ---- FIN");
							
						},
						
						/**
						 * Desactiva un dispositivo de Orange TV
						 * 
						 * @param request
						 *            Objeto con los datos para realizar la petición
						 * @param successCallback
						 *            Función que se ejecuta cuando la llamada al WS se ha realizado correctamente
						 * @param errorCallback
						 *            Función que se ejecuta cuando se ha producido algún error en la llamada al WS
						 * 
						 */
						desactivateDeviceTv : function(request, successCallback, errorCallback) {

							console.log("********** desactivateDeviceTv  ---- Desactivación de dispositivo de Orange TV");
							

							var channelType = restApiFactory.getChannelType(device.platform);
							
							var Headers = {
								'Content-Type' : 'application/json',
								'Channel' : channelType,
								'Lang' : 'es_ES',
								'Uuid' :request. msisdn,
								'msisdn' : request.msisdn,
								'isMigrated' : request.isMigrated,
								'X-WASSUP-CRED-USED' : request.msisdn,
								'X-WASSUP-CREDTYPE-USED' : 'MSISDN',
								'X-WASSUP-PA1' : request.msisdn,
								'X-WASSUP-SALTOID' : 'UNAVAILABLE'
							};
							if(request.segment==null)
								request.segment="DEFAULT";
							var jsonRequest = {
								"channel" : channelType,
								"lang" : "es_ES",
								"uuid" : request.msisdn,
								"msisdn" : request.msisdn,
								"segment" : request.segment,
								"customerId" : request.customerId,
								"clearCache" : request.clearCache,
								"invalidateCache" : request.invalidateCache,
								"terminalIdentifier" : request.terminalIdentifier,
								"options" : request.options
							};

							PostRest(Headers, jsonRequest, DESACTIVATION_DEVICE_TV, successCallback, errorCallback);

						},
						
						changePassword: function(updateUserRequest, successCallback, errorCallback){
							
							var channelType = restApiFactory.getChannelType(device.platform);
							
							//cabeceras de petición para updateUserRequest
							var Headers = {
										'Content-Type': 'application/json; charset=utf-8',
							            'channel'	: channelType,
							            'Lang'		: 'es_ES',
							            'Uuid'		: updateUserRequest.msisdn,
							            'Msisdn'	: updateUserRequest.msisdn,
										'X-WASSUP-CRED-USED' : updateUserRequest.msisdn,
										'X-WASSUP-CREDTYPE-USED' : updateUserRequest.credentialType,
										'X-WASSUP-PA1' : updateUserRequest.msisdn,
										'X-WASSUP-SALTOID' : 'UNAVAILABLE',
										'timeout' : updateUserRequest.timeout
							};
							
							//prepara el objeto JSON updateUserRequest con los datos necesarios
							if(updateUserRequest.segment==null)
								updateUserRequest.segment="DEFAULT";
							var updateUserRequestJson = 
							{
							"channel": channelType,
							"lang":"es_ES",
							"uuid": updateUserRequest.msisdn, 
							"msisdn": updateUserRequest.msisdn,
							"segment": updateUserRequest.segment,
							"customerId": updateUserRequest.customerId,
							"clearCache": "false",
							"datosPeticion": 
							 {
							  "requestingApp": updateUserRequest.requestingApp, 
							  "changeChosenPassword": "1",
							  "requestLabel": "changePassword",
							  "productValue": updateUserRequest.productValue,
							  "checkIdentity": 
								{
								 "credential": updateUserRequest.msisdn
								},
							  "canalOrigen": "NEOS",
							  "identityArray": 
								[
								 {
								  "identityCredentialArray": 
									[
									 {
									   "passwordArray": 
										 [
										  {
											"passwordType": "long",
											"passwordValue": updateUserRequest.password,
											"passwordStatus": "permanent"
										  }
										 ]
									 }
									]
								  }
								 ],
								"identityFindCriteria": 
								 {
								  "idCredentialCriteria": 
									{
									 "credentialType": updateUserRequest.credentialType,
									 "credentialValue": updateUserRequest.msisdn,
									 "supplierName": "OSP",
									 "domainName": "orange.es"
									}
								 }
							}
						  };
							console.log("**********WebServiceFactory:CHANGE_PWD---- "+JSON.stringify(updateUserRequestJson));
							
							PostRest(Headers, updateUserRequestJson, CHANGE_PWD, successCallback, errorCallback);
							
						},
						
						
					sendEmail : function(sendEmailRequest, successCallback, errorCallback){
							
							var channelType = restApiFactory.getChannelType(device.platform);
							
							var Headers={
									'X-WASSUP-CRED-USED' : sendEmailRequest.msisdn,
									'X-WASSUP-CREDTYPE-USED' : 'MSISDN',
									'X-WASSUP-PA1' : sendEmailRequest.msisdn,
									'X-WASSUP-SALTOID' : 'UNAVAILABLE'}; //IC_Notifications_sendEmail_v0.1 apdo.2.1.2
							
							//prepara el objeto JSON updateUserRequest con los datos necesarios
							if(sendEmailRequest.segment==null)
								sendEmailRequest.segment="DEFAULT";
							var sendEmailRequestJson = 
							{
							"channel": channelType,
							"lang":"es_ES",
							"uuid": sendEmailRequest.msisdn, 
							"msisdn": sendEmailRequest.msisdn,
							"segment": sendEmailRequest.segment,
							"customerId": sendEmailRequest.customerId,
							"clearCache": "false",
							"invalidateCache" : null,
							"to" : sendEmailRequest.sendTo,
							"from" : sendEmailRequest.mailFrom, //"Orange","Amena". Obtener del CMS
							"cc" : null,
							"bcc" : null,
							"subject": sendEmailRequest.subject, //obtener del CMS
							"aliasFrom" : sendEmailRequest.aliasFrom, //obtener de CMS
							"templateType": sendEmailRequest.templateType, //declarar en la función llamadora
							"templateParameter" : sendEmailRequest.templateParameter //dependerá del template.
							}
						PostRest(Headers, sendEmailRequestJson, SEND_EMAIL, successCallback, errorCallback);
							
						},
						
						/**
						 * Establece el limite de datos disponible para una linea expedit
						 * 
						 * @param request
						 *            Objeto con los datos para realizar la petición
						 * @param successCallback
						 *            Función que se ejecuta cuando la llamada al WS se ha realizado correctamente
						 * @param errorCallback
						 *            Función que se ejecuta cuando se ha producido algún error en la llamada al WS
						 * 
						 */
						setExpeditLimits: function(request, successCallback, errorCallback) {

							console.log("********** setExpeditLimits  ---- ");
							

							var channelType = restApiFactory.getChannelType(device.platform);
							
							var Headers={
									'X-WASSUP-CRED-USED' : request.msisdn,
									'X-WASSUP-CREDTYPE-USED' : 'MSISDN',
									'X-WASSUP-PA1' : request.msisdn,
									'X-WASSUP-SALTOID' : 'UNAVAILABLE'
							};
							if(request.segment==null)
								request.segment="DEFAULT";
							var jsonRequest = {
								"channel" : channelType,
								"lang" : "es_ES",
								"uuid" : request.msisdn,
								"msisdn" : request.msisdn,
								"segment" : request.segment,
								"customerId" : request.customerId,
								"limite" : request.limite.toString(),
								"partyType" : request.partyType,
								"msisdnSharedBucket" : request.msisdnSharedBucket,							
							};

							PostRest(Headers, jsonRequest, EXPEDIT_LIMITS, successCallback, errorCallback);
							
							
						},
						
						/**
						 * Lista de las últimas facturas
						 */
						getHistoricoFacturas : function(request, successCallback, errorCallback) {

							console.log("********** getHistoricoFacturas  ---- Historico de facturas");
							

							var channelType = restApiFactory.getChannelType(device.platform);
							
							var Headers = {
								'Content-Type' : 'application/json',
								'Channel' : channelType,
								'Lang' : 'es_ES',
								'Uuid' :request. msisdn,
								'msisdn' : request.msisdn,
								'isMigrated' : request.isMigrated,
								'X-WASSUP-CRED-USED' : request.msisdn,
								'X-WASSUP-CREDTYPE-USED' : 'MSISDN',
								'X-WASSUP-PA1' : request.msisdn,
								'X-WASSUP-SALTOID' : 'UNAVAILABLE'
							};
							
							if(request.segment==null)
								request.segment="DEFAULT";
							
							var jsonRequest = {
								"channel" : channelType,
								"lang" : "es_ES",
								"uuid" : request.msisdn,
								"msisdn" : request.msisdn,
								"segment" : request.segment,
								"customerId" : request.customerId,
								"customerCode" : request.customerCode,
								"billreview" : request.billreview,
								"numDocumento" : request.numDocumento,
								"restMode" : ""
							};

							PostRest(Headers, jsonRequest, HISTORICO_FACTURAS, successCallback, errorCallback);
						},
						
						/**
						 * Valida si los msisdns introducidos para la promoción Amigos gratis son correctos o no
						 * 
						 * @param request
						 *            Objeto con los datos para realizar la petición
						 * @param successCallback
						 *            Función que se ejecuta cuando la llamada al WS se ha realizado correctamente
						 * @param errorCallback
						 *            Función que se ejecuta cuando se ha producido algún error en la llamada al WS
						 * 
						 */
						validateFriendsToZeroPromotionMember : function(request, successCallback, errorCallback) {

							console.log("********** validateFriendsToZeroPromotionMember  ---- Validación de mssidns para promoción amigos gratis");
							

							var channelType = restApiFactory.getChannelType(device.platform);
							
							var Headers = {
								'Content-Type' : 'application/json',
								'Channel' : channelType,
								'Lang' : 'es_ES',
								'Uuid' :request. msisdn,
								'msisdn' : request.msisdn,
								'isMigrated' : request.isMigrated,
								'X-WASSUP-CRED-USED' : request.msisdn,
								'X-WASSUP-CREDTYPE-USED' : 'MSISDN',
								'X-WASSUP-PA1' : request.msisdn,
								'X-WASSUP-SALTOID' : 'UNAVAILABLE'
							};
							
							if(request.segment==null)
								request.segment="DEFAULT";
							
							var jsonRequest = {
								"channel" : channelType,
								"lang" : "es_ES",
								"uuid" : request.msisdn,
								"msisdn" : request.msisdn,
								"segment" : request.segment,
								"customerId" : request.customerId,
								"isMigrated" : request.isMigrated,
								"clearCache" : request.clearCache,
								"invalidateCache" : request.invalidateCache,
								"telefonoBasicoA" : request.telefonoBasicoA,
								"telefonoBasicoB" : request.telefonoBasicoB,
								"value" : request.value
							};

							PostRest(Headers, jsonRequest, VALIDATE_FRIENDS_TO_ZERO_PROMOTION_ME, successCallback, errorCallback);
						},

						
						/**
						 * Valida si los msisdns introducidos para la promoción Amigos gratis son correctos o no
						 * 
						 * @param request
						 *            Objeto con los datos para realizar la petición
						 * @param successCallback
						 *            Función que se ejecuta cuando la llamada al WS se ha realizado correctamente
						 * @param errorCallback
						 *            Función que se ejecuta cuando se ha producido algún error en la llamada al WS
						 * 
						 */
						changeLockSmartSim : function(request, successCallback, errorCallback) {

							console.log("********** changeLockSmartSim  ---- Bloquea o desbloquea una Smart-SIM");
							

							var channelType = restApiFactory.getChannelType(device.platform);
							
							var Headers = {
								'Content-Type' : 'application/json',
								'Channel' : channelType,
								'Lang' : 'es_ES',
								'Uuid' :request. msisdn,
								'msisdn' : request.msisdn,
								'isMigrated' : request.isMigrated,
								'X-WASSUP-CRED-USED' : request.msisdn,
								'X-WASSUP-CREDTYPE-USED' : 'MSISDN',
								'X-WASSUP-PA1' : request.msisdn,
								'X-WASSUP-SALTOID' : 'UNAVAILABLE'
							};
							
							if(request.segment==null)
								request.segment="DEFAULT";
							
							var jsonRequest = {
								"channel" : channelType,
								"lang" : "es_ES",
								"uuid" : request.msisdn,
								"msisdn" : request.msisdn,
								"segment" : request.segment,
								"customerId" : request.customerId,
								"msisdnSmartSim" : request.msisdnSmartSim,
								"accion" : request.accion
							};

							PostRest(Headers, jsonRequest, CHANGE_LOCK_SMART_SIM, successCallback, errorCallback);
						
						},
						
						/**
						 * Activa la factura on-line
						 * 
						 * @param request
						 *            Objeto con los datos para realizar la petición
						 * @param successCallback
						 *            Función que se ejecuta cuando la llamada al WS se ha realizado correctamente
						 * @param errorCallback
						 *            Función que se ejecuta cuando se ha producido algún error en la llamada al WS
						 * 
						 */
						registerFspUser : function(request, successCallback, errorCallback) {

							console.log("********** registerFspUser  ---- Activación factura online");
							
							var Headers = {
								'Content-Type' : 'application/json',
								'Channel' : request.channel,
								'Lang' : 'es_ES',
								'Uuid' :request. msisdn,
								'msisdn' : request.msisdn,
								'isMigrated' : request.isMigrated,
								'X-WASSUP-CRED-USED' : request.msisdn,
								'X-WASSUP-CREDTYPE-USED' : 'MSISDN',
								'X-WASSUP-PA1' : request.msisdn,
								'X-WASSUP-SALTOID' : 'UNAVAILABLE'
							};
							
							if(request.segment==null)
								request.segment="DEFAULT";
							
							var jsonRequest = {
								"channel" : request.channel,
								"lang" : "es_ES",
								"uuid" : request.msisdn,
								"msisdn" : request.msisdn,
								"segment" : request.segment,
								"customerId" : request.customerId,
								"customer" : request.customer,
								"seqNumber":request.seqNumber,
								"subjectEmail":request.subjectEmail,
								"aliasEmail":request.aliasEmail,
								"templateType":request.templateType,
								"fromEmail":request.fromEmail,
								"activationUrl":request.activationUrl
							};

							PostRest(Headers, jsonRequest, REGISTERFSPUSER, successCallback, errorCallback);

						},
						/**
						 * Desactiva la factura on-line
						 * 
						 * @param request
						 *            Objeto con los datos para realizar la petición
						 * @param successCallback
						 *            Función que se ejecuta cuando la llamada al WS se ha realizado correctamente
						 * @param errorCallback
						 *            Función que se ejecuta cuando se ha producido algún error en la llamada al WS
						 * 
						 */
						unRegisterFspUser : function(request, successCallback, errorCallback) {

							console.log("********** unRegisterFspUser  ---- Desactivacion factura online");
							

							var channelType = restApiFactory.getChannelType(device.platform);
							
							var Headers = {
								'Content-Type' : 'application/json',
								'Channel' : request.channel,
								'Lang' : 'es_ES',
								'Uuid' :request. msisdn,
								'msisdn' : request.msisdn,
								'isMigrated' : request.isMigrated,
								'X-WASSUP-CRED-USED' : request.msisdn,
								'X-WASSUP-CREDTYPE-USED' : 'MSISDN',
								'X-WASSUP-PA1' : request.msisdn,
								'X-WASSUP-SALTOID' : 'UNAVAILABLE'
							};
							
							if(request.segment==null)
								request.segment="DEFAULT";
							
							var jsonRequest = {
								"channel" : channelType,
								"lang" : "es_ES",
								"uuid" : request.msisdn,
								"msisdn" : request.msisdn,
								"segment" : request.segment,
								"customerId" : request.customerId,
								"custId" : request.customerId,
								"custcode": request.custcode
							};

							PostRest(Headers, jsonRequest, UNREGISTERFSPUSER, successCallback, errorCallback);

						},
						
						/**
						 * Enviar SMS para factura online
						 * 
						 * @param request
						 *            Objeto con los datos para realizar la petición
						 * @param successCallback
						 *            Función que se ejecuta cuando la llamada al WS se ha realizado correctamente
						 * @param errorCallback
						 *            Función que se ejecuta cuando se ha producido algún error en la llamada al WS
						 * 
						 */
						sendSmsNotification : function(request, successCallback, errorCallback) {

							console.log("********** sendSmsNotification  ---- SMS factura online");
							

							var channelType = restApiFactory.getChannelType(device.platform);
							
							var Headers = {
								'Content-Type' : 'application/json',
								'Channel' : channelType,
								'Lang' : 'es_ES',
								'Uuid' :request. msisdn,
								'msisdn' : request.msisdn,
								'isMigrated' : request.isMigrated,
								'X-WASSUP-CRED-USED' : request.msisdn,
								'X-WASSUP-CREDTYPE-USED' : 'MSISDN',
								'X-WASSUP-PA1' : request.msisdn,
								'X-WASSUP-SALTOID' : 'UNAVAILABLE'
							};
							
							if(request.segment==null)
								request.segment="DEFAULT";
							
							var jsonRequest = {
								"channel" : channelType,
								"lang" : "es_ES",
								"uuid" : request.msisdn,
								"msisdn" : request.msisdn,
								"segment" : request.segment,
								"customerId" : request.customerId,
								"phoneNumber": request.smsNumber,
								"message": "El sistema de facturación online, ha sido activado.",
								"clientType": request.clientType
							};

							PostRest(Headers, jsonRequest, SENDSMSNOTIFICATION, successCallback, errorCallback);

						},
						/**
						 * Función encargada de obtener los datos de facturacion del cliente
						 */
						getClient : function(request, callBackOk, callBackFail) {
							console.log("********** getClient ---- Inicio");							
							
							var channelType = restApiFactory.getChannelType(device.platform);
							var Headers = {
								'Content-Type' : 'multipart/form-data',
								'Channel' : channelType,
								'Lang' : 'es_ES',
								'Uuid' : request.msisdn,
								'msisdn' : request.msisdn,
								'segment' : request.segment,
								'customerId' : request.customerId,
								'X-WASSUP-CRED-USED' : request.msisdn,
								'X-WASSUP-CREDTYPE-USED' : 'MSISDN',
								'X-WASSUP-PA1' : request.msisdn,
								'X-WASSUP-SALTOID' : 'UNAVAILABLE'
							};
							var parameters = "line/"+request.msisdn+"/customerCode/"+request.customer.custCode+"/addrFlg/Y";

							console.log("********** getClient ---- llama a GetRest con servicio " + GETCLIENT);
							
							GetRest(Headers, GETCLIENT+parameters, callBackOk, callBackFail);

						},
						
						/**
						 * Modifica el aviso de factura por email y sms
						 * 
						 * @param request
						 *            Objeto con los datos para realizar la petición
						 * @param successCallback
						 *            Función que se ejecuta cuando la llamada al WS se ha realizado correctamente
						 * @param errorCallback
						 *            Función que se ejecuta cuando se ha producido algún error en la llamada al WS
						 * 
						 */
						modifyFspUser : function(request, successCallback, errorCallback) {

							console.log("********** modifyFspUser  ---- Modificación avisos factura online");
							
							var Headers = {
								'Content-Type' : 'application/json',
								'Channel' : request.channel,
								'Lang' : 'es_ES',
								'Uuid' :request. msisdn,
								'msisdn' : request.msisdn,
								'isMigrated' : request.isMigrated,
								'X-WASSUP-CRED-USED' : request.msisdn,
								'X-WASSUP-CREDTYPE-USED' : 'MSISDN',
								'X-WASSUP-PA1' : request.msisdn,
								'X-WASSUP-SALTOID' : 'UNAVAILABLE'
							};
							
							if(request.segment==null)
								request.segment="DEFAULT";
							
							var jsonRequest = {
								"channel" : request.channel,
								"lang" : "es_ES",
								"uuid" : request.msisdn,
								"msisdn" : request.msisdn,
								"segment" : request.segment,
								"customerId" : request.customerId,
								"customer" : request.customer,
								"seqNumber":request.seqNumber,
								"previousEmail":request.previousEmail,
								"subjectEmail":request.subjectEmail,
								"aliasEmail":request.aliasEmail,
								"templateType":request.templateType,
								"fromEmail":request.fromEmail,
								"activationUrl":request.activationUrl
							};

							PostRest(Headers, jsonRequest, MODIFY_FSP_USER, successCallback, errorCallback);

						},
						
						/**
						 * Obtiene la información de un usuario de tipo residencial
						 * 
						 * @param request
						 *            Objeto con los datos de la petición
						 * @param callBackOk
						 *            Función que se ejecuta cuando la llamada al WS se ha realizado correctamente
						 * @param callBackFail
						 *            Función que se ejecuta cuando se ha producido algún error en la llamada al WS
						 */
						getUserInfo : function(request, callBackOk, callBackFail) {
							
							console.log("********** getUserInfo ---- Inicio");
							

							var channelType = restApiFactory.getChannelType(device.platform);

							var Headers = {
								'Content-Type' : 'multipart/form-data',
								'Channel' : channelType,
								'Lang' : 'es_ES',
								'Uuid' : request.msisdn,
								'msisdn' : request.msisdn,
								'segment' : null,
								'customerId' : request.customerId,
								'X-WASSUP-CRED-USED' : request.msisdn,
								'X-WASSUP-CREDTYPE-USED' : 'MSISDN',
								'X-WASSUP-SALTOID' : 'UNAVAILABLE'
							};
							
							var parameters = "custCode/" + request.custCode;
							
							GetRest(Headers, GET_USER_INFO + parameters, callBackOk, callBackFail);
							console.log("********** getUserInfo ---- FIN");
							
						},
						/**
						 * getMdgData: obtiene todos los datos asociados a un cliente desde MDG 
						**/

							loadMdgData: function(msisdn,callBackOk,callBackFail){
								
								var params = GET_MDG.replace(/{NIF}/,msisdn).replace(/{MARCA}/,APP_MARCA).replace(/{MSISDN}/g,msisdn);
								
								var data = {
										retry : NUM_MAX_REINTENTOS_WS,
										timeout : GETREST_TIMEOUT,
										responseType : 'json',
										urlBase : MDG_HOSTNAME,
										parameters : params,
										cms : true,
										headers : {
											msisdn : msisdn
										}
								}
								
								restApiFactory.get(data,callBackOk, callBackFail);
								console.log("******* loadMdgData *************");
								
							},
							
							/**
							 * loadInvoiceList: obtiene el histórico de facturas mediante petición a microservicio 
							**/

							loadInvoiceList: function(request,callBackOk,callBackFail){
									
								    var NIF = request.numDocumento;
								    var customerCode = request.customerCode;
								    var billReview=false;
								    var channelType = restApiFactory.getChannelType(device.platform);
								    
									var Headers = {
											/*
											'Content-Type' : 'application/json',
											'Channel' : channelType,
											'Lang' : 'es_ES',
											'Uuid' :request. msisdn,
											'msisdn' : request.msisdn,
											'isMigrated' : request.isMigrated,
											'X-WASSUP-CRED-USED' : "34" + request.msisdn,
											'X-WASSUP-CREDTYPE-USED' : 'MSISDN',
											'X-WASSUP-PA1' : 'NIE',
											'X-WASSUP-PA2' : NIF,											
											'X-WASSUP-SALTOID' : 'UNAVAILABLE'
											*/

											'X-FORWARDED-FOR' : "195.235.176.225, 10.113.51.4",
											'HTTP_X_FORWARDED_HOST' : "areaprivada.orange.es, areaprivada.orange.es",
											'HTTP_X_FORWARDED_SERVER' : "gidf.orange.es, gidf.orange.es",
											'HTTP_X_WASSUP_CREDTYPE_USED' : "MSISDN",
											'HTTP_X_WASSUP_CRED_USED' : "34" + request.msisdn,
											'HTTP_X_WASSUP_PA1' : "NIE",
											'X-WASSUP-PA2' : NIF,
											'X-WASSUP-SALTOID' : "UNAVAILABLE"
			
										};

								    var params = GET_INVOICES.replace(/{D1}/,billReview).replace(/{D2}/,NIF).replace(/{D3}/,customerCode);
									
									var data = {
											retry : NUM_MAX_REINTENTOS_WS,
											timeout : GETREST_TIMEOUT,
											responseType : 'json',
											urlBase : INV_HOSTNAME,
											parameters : params,
											//cms : true,
											headers : Headers
									}
									
									console.log("\n******\nPeticion Historico facturas. Documento: " + NIF + " customerCode:" + customerCode);
									console.log("Cabecera:\n" + JSON.stringify(Headers));
									console.log("petición GET: " + data.urlBase + data.parameters);
									
									restApiFactory.get(data,callBackOk, callBackFail);
									console.log("******* loadMdgData *************");
									
								},
							
							/**
							 * Recupera los datos de una factura indicando msisdn, fecha y num. factura 
							 * invoiceRequest: 
							 * 	- msisdn
							 *  - segment
							 *  - customerId
							 *  - idFactura
							 *  - customerCode
							 *  - mes
							 *  - anio
							 *  - numeroLinea
							 */
							loadInvoiceDetail: function(request,callBackOk, callBackFail){

								var channelType = restApiFactory.getChannelType(device.platform);
								
								var Headers = {
										'Content-Type' : 'application/json',
										'Channel' : channelType,
										'Lang' : 'es_ES',
										'Uuid' :request. msisdn,
										'msisdn' : request.msisdn,
										'isMigrated' : request.isMigrated,
										'X-WASSUP-CRED-USED' : request.msisdn,
										'X-WASSUP-CREDTYPE-USED' : 'MSISDN',
										'X-WASSUP-PA1' : request.msisdn,
										'X-WASSUP-SALTOID' : 'UNAVAILABLE'
									};

									var jsonRequest = {
										"channel" : channelType,
										"lang" : "es_ES",
										"uuid" : request.msisdn,
										"msisdn" : request.msisdn,
										"segment" : request.segment,
										"customerId" : request.customerId,
										"idFactura" : request.idFactura,
										"customerCode" : request.customerCode,
										"mes" : request.mes,
										"anio" : request.anio,
										"tipoElemento" : 1,
										"billReview" : false,
										"version" : 2,
										"isMigrated" : request.isMigrated
									};

								
								PostRest(Headers, jsonRequest, GET_DETALLEFACTURA, callBackOk, callBackFail);
								console.log("******* loadInvoiceDetail *************");
							},
							
							/**
							 * Recupera los datos de detalle de una factura para una línea (multilinea) indicando msisdn, fecha y num. factura 
							 * invoiceRequest: 
							 * 	- msisdn
							 *  - segment
							 *  - customerId
							 *  - idFactura
							 *  - customerCode
							 *  - mes
							 *  - anio
							 *  - numeroLinea
							 */
							loadInvoiceLineDetail: function(request,callBackOk, callBackFail){

								var channelType = restApiFactory.getChannelType(device.platform);
								
								var Headers = {
										'Content-Type' : 'application/json',
										'Channel' : channelType,
										'Lang' : 'es_ES',
										'Uuid' :request. msisdn,
										'msisdn' : request.msisdn,
										'isMigrated' : request.isMigrated,
										'X-WASSUP-CRED-USED' : request.msisdn,
										'X-WASSUP-CREDTYPE-USED' : 'MSISDN',
										'X-WASSUP-PA1' : request.msisdn,
										'X-WASSUP-SALTOID' : 'UNAVAILABLE'
									};

									var jsonRequest = {
										"channel" : channelType,
										"lang" : "es_ES",
										"uuid" : request.msisdn,
										"msisdn" : request.msisdn,
										"segment" : request.segment,
										"customerId" : request.customerId,
										"idFactura" : request.idFactura,
										"customerCode" : request.customerCode,
										"mes" : request.mes,
										"anio" : request.anio,
										"tipoElemento" : 1,
										"billReview" : false,
										"version" : 2,
										"numeroLinea" : request.numeroLinea,
										"isMigrated" : request.isMigrated
									};

								
								PostRest(Headers, jsonRequest, GET_DETALLELINEA, callBackOk, callBackFail);
								console.log("******* loadInvoiceLineDetail *************");
							}							
						
					};

				});
