var libs = {
    portal : require('/lib/xp/portal'),
    thymeleaf : require('/lib/xp/thymeleaf'),
    content : require('/lib/xp/content'),
    util : require('/lib/enonic/util')
};

//Setting
var view = resolve("button.html");

exports.get = function(req){

    var component = libs.portal.getComponent();
    var config = component.config;
    var btnUrl;
    if(config){
        if(config.btnUrl){
            var btnKey = libs.content.get({
                key : config.btnUrl
            });

            if(btnKey){
                btnUrl = libs.portal.pageUrl({
                    path : btnKey._path
                });
            }
        }
        else if(config.externalUrl){
            btnUrl = config.externalUrl;
        }
    }
    var configColor = config.btnColor || "#5bb75b";
    var btnColor = "background-color :" + configColor + ";";

    var model = {
        btnText : config.btnText || "Click Here",
        btnColor : btnColor,
        btnUrl : btnUrl
};

    var body = libs.thymeleaf.render(view, model);
    return { body : body};
}