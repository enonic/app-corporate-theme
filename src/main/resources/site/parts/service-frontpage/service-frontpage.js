var libs = {
    portal : require('/lib/xp/portal'),
    thymeleaf : require('/lib/thymeleaf'),
    content : require('/lib/xp/content'),
    util : require('/lib/enonic/util'),
    shared : require('/lib/shared'),
    services: require('/content-types/service')
};

var view = resolve('service-frontpage.html');

var CONTENT_TYPE_SERVICES = app.name + ':service';


exports.get = function(req){
    var config = libs.portal.getComponent().config;

    var contents = libs.shared.getContents(CONTENT_TYPE_SERVICES, function() {
        var ids = config.service ? libs.util.data.forceArray(config.service) : null;
        if(ids) {
            var _contents = [];
            for(var i = 0; i < ids.length; i++ ) {
                var content = libs.content.get({ key: ids[i] });
                content && _contents.push(content);
            }
            return _contents;
        }
    });

    var services = [];
    for(var j = 0; j < contents.length; j++ ) {
        services.push(libs.services.getServicesModelFromContent(contents[j]));
    }

    var model = {
        title : config.title || "No title added",
        intro : config.intro || "No description added",
        services : services
    };

    return { body: libs.thymeleaf.render(view, model) };
};
