var libs = {
    portal : require('/lib/xp/portal'),
    thymeleaf : require('/lib/xp/thymeleaf'),
    content : require('/lib/xp/content'),
    util : require('/lib/enonic/util'),
    shared : require('/lib/shared')
};

//Setting
var view = resolve("service-show.html");

exports.get = function(req){

    var currentService = libs.portal.getContent();
    var serviceKey = libs.content.get({
        key : currentService._id
    });

    if(serviceKey){
        var service = {
            icon : "icon-" + serviceKey.data.iconServicePage + " icon-large",
            title : serviceKey.data.serviceTitle,
            description : serviceKey.data.serviceDescription
        };
    }
   
    var model= {
        service : service || null
    };
    
    var body = libs.thymeleaf.render(view, model);
    return { body : body};
};