ORANGE_APP = ORANGE_APP || angular.module('OrangeLib',[]);

ORANGE_APP.directive('mdgInfoLineaFijo', function(mdgFactory){
	return {
		restrict: "EC",
		templateUrl: function() {
			var templatePath = TEMPLATE_PATH;
			switch (APP_NAME) {
				case 'miAmenaApp' : //templatePath += 'mdg/miAmena_mdgInfoLineaFijo.html'; break;
				case 'miOrangeApp': //templatePath += 'mdg/miOrange_mdgInfoLineaFijo.html'; break;
				default : templatePath += 'mdg/mdgInfoLineaFijo.html';
			}
			return templatePath;		
		},
		scope : true,
	    link: function(scope,elem,attr){
		  
		  //console.log("mdgInfoLineaFijo. scope:" + scope);
		  
	    }
	}
})