var libs = {
    portal: require('/lib/xp/portal'),
    thymeleaf: require('/lib/xp/thymeleaf'),
    util : require('/lib/enonic/util')
};
var view = resolve('layout-1-col.html');

exports.get = function(req) {
    var component = libs.portal.getComponent();
	var classList = component.config.fullWidth ? "container-fluid" : "container";
    var model = {
        mainRegion: component.regions['main'],
        container: 'layout-col-1 ' + classList,
        backgroundColor: component.config.backgroundColor || null
    };
    var body = libs.thymeleaf.render(view, model);
    return { body: body };
};
