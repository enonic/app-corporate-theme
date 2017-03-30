var libs = {
    portal : require('/lib/xp/portal'),
    thymeleaf : require('/lib/xp/thymeleaf'),
    contentLib : require('/lib/xp/content'),
    util : require('/lib/enonic/util')
};

//Setting
var view = resolve("service.html");

exports.get = function(req){
    
    var content = libs.portal.getContent();
    var currentSite = libs.portal.getSite()._path;
    var serviceList =[];

    var services = libs.contentLib.query({
        start : 0,
        count : 300,
        sort : "modifiedTime DESC",
        contentTypes : [
            app.name + ":service"
        ],
        query : "_path LIKE '/content" + currentSite + "/*'"
    });

    if(services){
        for(var i=0; i <services.hits.length; i++){
            var hit = services.hits[i];
            var icon = null;

            if(hit.data.iconServicePage){
               icon = "icon-" + hit.data.iconServicePage + " icon-large"
            } else {
                icon = "icon-bar-chart icon-large";
            }

            var serviceObj = {
                icon : icon,
                title : hit.displayName,
                intro : hit.data.serviceIntro ? hit.data.serviceIntro : null,
            };
                if(serviceObj){
                serviceList.push(serviceObj);
            }
        }
    }

    var model = {
        serviceList : serviceList ? serviceList : null
    };

    var body = libs.thymeleaf.render(view, model);
    return { body : body};
};