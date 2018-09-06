var libs = {
    portal : require('/lib/xp/portal'),
    thymeleaf : require('/lib/xp/thymeleaf'),
    util : require('/lib/enonic/util'),
    shared : require('/lib/shared')
};

var view = resolve('layout-2-col.html');

exports.get = function(req){

    var component = libs.portal.getComponent();
    var config = component.config;
    var columnConfig = config.layoutConf || '50-50'; // Always have fallback for those times nothing is saved/defaulted yet.
	 var columns = columnConfig.split('-');
    var leftCol = libs.shared.mapBootstrapColumns(columns[0]) || "col-md-6";
    var rightCol = libs.shared.mapBootstrapColumns(columns[1]) || "col-md-6";

	 var containerClass = config.fullWidthBackground ? (config.fullWidthBackground.yes ? 'container-fluid' : 'container') : 'container';
	 var containerColor = config.fullWidthBackground ? (config.fullWidthBackground.yes ? config.fullWidthBackground.yes.backgroundColor : 'transparent') : 'transparent';

    var model = {
        leftRegion : component.regions["left"],
        rightRegion : component.regions["right"],
        leftCol : leftCol,
        rightCol : rightCol,
        containerClass: containerClass,
		  containerColor: containerColor
    };

    var body = libs.thymeleaf.render(view, model);
    return {body : body};
};
