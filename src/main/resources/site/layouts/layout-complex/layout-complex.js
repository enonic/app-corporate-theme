var libs = {
    portal : require('/lib/xp/portal'),
    thymeleaf : require('/lib/xp/thymeleaf'),
    util : require('/lib/enonic/util'),
    shared : require('/lib/shared')
};

var view = resolve('layout-complex.html');

exports.get = function(req) {

    var component = libs.portal.getComponent();
    var config = component.config;
    var columnConfig = config.layoutConf;
    var fullWidth = config.fullWidth ? "container-fluid" : "container";

    var model = {
		  topLeft: component.regions["topLeft"],
		  topMiddle: component.regions["topMiddle"],
		  topRight: component.regions["topRight"],
		  middleFull: component.regions["middleFull"],
		  bottomLeft: component.regions["bottomLeft"],
		  bottomRight: component.regions["bottomRight"],
		  topLeftClass: 'col-md-4',
		  topMiddleClass: 'col-md-4',
		  topRightClass: 'col-md-4',
		  middleFullClass: 'col-md-12',
		  bottomLeftClass: 'col-md-6',
		  bottomRightClass: 'col-md-6',
        container : fullWidth
    };

    return {
		 body: libs.thymeleaf.render(view, model)
	 };
};
