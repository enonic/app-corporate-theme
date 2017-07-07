var libs = {
    portal: require('/lib/xp/portal'),
    thymeleaf: require('/lib/xp/thymeleaf'),
    util : require('/lib/enonic/util')
};
var view = resolve('layout-1-col.html');

exports.get = function(req) {
    var component = libs.portal.getComponent();
    var model = {
        mainRegion: component.regions['main'],
        container: component.config.fullWidth ? "container-fluid" : "container",
        backgroundColor: component.config.backgroundColor || null
    };
    var body = libs.thymeleaf.render(view, model);
    return { body: body };
};
