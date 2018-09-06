var libs = {
    portal : require('/lib/xp/portal'),
    thymeleaf : require('/lib/xp/thymeleaf'),
    util : require('/lib/enonic/util'),
    shared : require('/lib/shared')
};

var view = resolve('layout-3-col.html');

exports.get = function(req) {

    var component = libs.portal.getComponent();
    var config = component.config;
    var columnConfig = config.layoutConf || '30-30-30'; // Always have fallback for those times nothing is saved/defaulted yet.
	 var columns = columnConfig.split('-');
    var leftCol = libs.sharedmapBootstrapColumns(columns[0]) || "col-md-4";
    var middleCol = libs.sharedmapBootstrapColumns(columns[1]) || "col-md-4";
    var rightCol = libs.sharedmapBootstrapColumns(columns[2]) || "col-md-4";

    var fullWidth = config.fullWidth ? "container-fluid" : "container";
    var model = {
        leftRegion : component.regions["left"],
        middleRegion : component.regions["middle"],
        rightRegion : component.regions["right"],
		  columns: {
			  left: leftCol,
			  center: middleCol,
			  right: rightCol
		  },
        container : fullWidth
    };

    return {
		 body : libs.thymeleaf.render(view, model)
	 };
};
