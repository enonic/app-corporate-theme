var libs = {
    portal: require('/lib/xp/portal'),
    thymeleaf: require('/lib/xp/thymeleaf'),
    util : require('/lib/enonic/util')
};

// SETTINGS
var view = resolve('layout-1-col.html');

// Handle the GET request
exports.get = function(req) {

    var component = libs.portal.getComponent();
    var config = component.config;
    var fullWidth = null;
    
    if(config.fullWidth) {
       fullWidth = "width : 100%"; 
    }

    var model = {
        mainRegion: component.regions['main'],
        fullWidth : fullWidth
    };

    // Rendering
    var body = libs.thymeleaf.render(view, model);
    return { body: body };
};
