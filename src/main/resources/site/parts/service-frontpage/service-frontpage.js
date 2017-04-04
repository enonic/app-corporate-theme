var libs = {
    portal : require('/lib/xp/portal'),
    thymeleaf : require('/lib/xp/thymeleaf'),
    content : require('/lib/xp/content'),
    util : require('/lib/enonic/util'),
    shared : require('/lib/shared')
};

var view = resolve('service-frontpage.html');

exports.get = function(req){

    var config = libs.portal.getComponent().config;
    var serviceId = [];
    var serviceArray = config.service ? libs.util.data.forceArray(config.service) : null;

    if(serviceArray){
        for(var i = 0; i < serviceArray.length; i++ ) {
            var serviceKey = libs.content.get({
                key: serviceArray[i]
            });
            serviceId.push(serviceKey);
        }

            var  services = libs.shared.getServiceData(serviceId);
    }


    var model = {
        title : config.title || "No title added",
        intro : config.intro || "No description added",
        services : services
    };

    var body = libs.thymeleaf.render(view, model);
    return {body : body};

};
