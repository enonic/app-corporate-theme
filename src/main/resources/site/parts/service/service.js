var libs = {
    portal : require('/lib/xp/portal'),
    thymeleaf : require('/lib/xp/thymeleaf'),
    content : require('/lib/xp/content'),
    util : require('/lib/enonic/util'),
    shared : require('/lib/shared')
};

//Setting
var view = resolve("service.html");

exports.get = function(req){

    var content = libs.portal.getContent();
    var currentSite = libs.portal.getSite()._path;
    var serviceList =[];

    var services = libs.content.getChildren({
		key: content._id,
		start: 0,
        count: 100,
        contentTypes: [
            app.name + ":service"
        ]
    });

    if (services) {
        serviceList = libs.shared.getServiceData(services.hits);
    }

    var model = {
        serviceList : serviceList ? libs.util.data.forceArray(serviceList) : null
    };

    var body = libs.thymeleaf.render(view, model);
    return { body : body };
};
