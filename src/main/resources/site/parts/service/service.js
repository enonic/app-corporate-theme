var libs = {
    portal : require('/lib/xp/portal'),
    thymeleaf : require('/lib/thymeleaf'),
    content : require('/lib/xp/content'),
    util : require('/lib/enonic/util'),
    shared : require('/lib/shared'),
    services: require('/content-types/service')
};

var view = resolve("service.html");

var CONTENT_TYPE_SERVICES = app.name + ':service';


exports.get = function(req) {
    var contents = libs.shared.getContents(CONTENT_TYPE_SERVICES, function() {
        return libs.shared.getAllWithinSite(CONTENT_TYPE_SERVICES);
    });

    var services = [];
    for(var j = 0; j < contents.length; j++ ) {
        services.push(libs.services.getServicesModelFromContent(contents[j]));
    }

    var model = { serviceList : services };

    return { body: libs.thymeleaf.render(view, model) };
};
