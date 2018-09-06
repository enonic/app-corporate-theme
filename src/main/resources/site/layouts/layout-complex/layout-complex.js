var libs = {
    portal : require('/lib/xp/portal'),
    thymeleaf : require('/lib/xp/thymeleaf'),
    util : require('/lib/enonic/util')
};

var view = resolve('layout-complex.html');

exports.get = function(req) {

    var component = libs.portal.getComponent();
    var config = component.config;
	 var containerClass = config.fullWidthBackground ? (config.fullWidthBackground.yes ? 'container-fluid' : 'container') : 'container';
	 var containerColor = config.fullWidthBackground ? (config.fullWidthBackground.yes ? config.fullWidthBackground.yes.backgroundColor : 'transparent') : 'transparent';

    var model = {
		  topLeftRegion: component.regions["topLeft"],
		  topMiddleRegion: component.regions["topMiddle"],
		  topRightRegion: component.regions["topRight"],
		  middleFullRegion: component.regions["middleFull"],
		  bottomLeftRegion: component.regions["bottomLeft"],
		  bottomRightRegion: component.regions["bottomRight"],
		  topLeftClass: 'col-md-4',
		  topMiddleClass: 'col-md-4',
		  topRightClass: 'col-md-4',
		  middleFullClass: 'col-md-12',
		  bottomLeftClass: 'col-md-6',
		  bottomRightClass: 'col-md-6',
        containerClass: containerClass,
		  containerColor: containerColor
    };

    return {
		 body: libs.thymeleaf.render(view, model)
	 };
};
