var libs = {
    portal: require('/lib/xp/portal'),
    thymeleaf: require('/lib/xp/thymeleaf'),
    util : require('/lib/enonic/util')
};
var view = resolve('layout-1-col.html');

exports.get = function(req) {
    var component = libs.portal.getComponent();
	 var config = component.config;

 	 var containerClass = config.fullWidthBackground.yes ? "container-fluid" : "container";
 	 var containerColor = config.fullWidthBackground.yes ? config.fullWidthBackground.yes.backgroundColor : 'transparent';

    var model = {
        mainRegion: component.regions['main'],
        containerClass: containerClass,
		  containerColor: containerColor
    };

    return {
		 body: libs.thymeleaf.render(view, model)
	 };
};
