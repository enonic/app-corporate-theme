var libs = {
    portal: require('/lib/xp/portal'),
    thymeleaf: require('/lib/xp/thymeleaf'),
    util : require('/lib/enonic/util')
};
var view = resolve('layout-1-col.html');

exports.get = function(req) {
    var component = libs.portal.getComponent().config;
    var model = {
        mainRegion: component.regions['main'],
        container: config.fullWidth ? "container-fluid" : "container",
        backgroundColor: config.backgroundColor || "#252525"
    };
    var body = libs.thymeleaf.render(view, model);
    return { body: body };
};
