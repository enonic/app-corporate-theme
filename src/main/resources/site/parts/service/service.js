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

    var services = libs.content.query({
        start : 0,
        count : 300,
        sort : "modifiedTime DESC",
        contentTypes : [
            app.name + ":service"
        ],
        query : "_path LIKE '/content" + currentSite + "/*'"
    });

    if(services){
        var servicesResult = services.hits;
        var serviceList = libs.shared.getServiceData(servicesResult);
    }

    var model = {
        serviceList : serviceList ? serviceList : null
    };

    var body = libs.thymeleaf.render(view, model);
    return { body : body};
};