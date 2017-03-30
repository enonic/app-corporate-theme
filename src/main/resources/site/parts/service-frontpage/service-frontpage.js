var libs = {
    portal : require('/lib/xp/portal'),
    thymeleaf : require('/lib/xp/thymeleaf'),
    contentLib : require('/lib/xp/content'),
    util : require('/lib/enonic/util')
};

var view = resolve('service-frontpage.html');

exports.get = function(req){

    var config = libs.portal.getComponent().config;
	 var services = [];
    var serviceArray = config.service ? libs.util.data.forceArray(config.service) : null;

    if(serviceArray){
        for(var i = 0; i < serviceArray.length; i++ ){
            var serviceKey = libs.contentLib.get({
                key : serviceArray[i]
            });

				if (serviceKey) {
	            var serviceObject = {
	                icon : serviceKey.data.iconFrontPage || "globe",
	                serviceTitle : serviceKey.data.serviecTitle || "No title added",
	                serviceIntro : serviceKey.data.serviceIntro || "No description added"
	            };
				}

            if(serviceObject){
                services.push(serviceObject);
            }
        }
    }

    var model = {
        title : config.title || "No title added",
        intro : config.intro || "No description added",
        services : services
    };
    var body = libs.thymeleaf.render(view, model);
    return {body : body};

};
