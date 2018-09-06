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
    var leftCol = libs.sharedmapBootstrapColumns(columns[0]) || "col-md-6";
    var rightCol = libs.sharedmapBootstrapColumns(columns[1]) || "col-md-6";

    var fullWidth = config.fullWidth ? "container-fluid" : "container";
    var model = {
        leftRegion : component.regions["left"],
        rightRegion : component.regions["right"],
        leftCol : leftCol,
        rightCol : rightCol,
        container : fullWidth
    };

    var body = libs.thymeleaf.render(view, model);
    return {body : body};
};
