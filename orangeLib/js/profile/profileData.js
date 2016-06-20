ORANGE_APP = ORANGE_APP || angular.module('OrangeLib',[])
 .config(function($stateProvider){
		$stateProvider.state('services',{
			 url: '/services/:msisdn',
			 templateUrl : TEMPLATE_PATH + 'services/servicesList.html',
			 controller: 'initCtrl'
		 })
		 .state('listaFacturas',{
			 url: '/services/:msisdn',
			 templateUrl : TEMPLATE_PATH + 'invoice/invoiceList.html',
		 })
 })

ORANGE_APP.directive('profileData', function($state, profileFactory){
	return {
		restrict: "EC",
		templateUrl: function() {
			var templatePath = TEMPLATE_PATH;
			switch (APP_NAME) {
				case 'miAmenaApp' : //templatePath += 'profile/miAmena_profile.html'; break;
				case 'miOrangeApp': //templatePath += 'profile/miOrange_profile.html'; break;
				default : templatePath += 'profile/profileData.html';
			}
			return templatePath;		
		},
		scope : {
			msisdn : "@",
			level: "@",
			onselect : "=",
			showdetails : "="
		},
	    link: function(scope,elem, attr) {
	      console.log("PROFILE. Level=" + scope.level);	
	      scope.showProfileDetails = (['yes','si','true'].indexOf(attr.showdetails) > -1); 
	      var goOnSelect = attr.onselect;
	      
	      scope.selectLinea = function(lineSelected){
	    	  console.log("\n******\nPROFILE: selecciona linea " + lineSelected + " y quiere abrir datos en state:" + goOnSelect);
	    	  $state.go(goOnSelect, {msisdn: lineSelected});
	      }
	    	
	      attr.$observe('msisdn', function(NUM) {
	    	    if (NUM > 600000000 && NUM < 799999999) {
	    	    	profileFactory.loadProfile(NUM, function(profileRead){
	    	    		scope.perfil = profileRead;
	    	    	})
	    	    }
	    	    else profileFactory.clearProfile();
	      }, true);
	    }
	  }
})
		
