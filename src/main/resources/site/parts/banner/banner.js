var libs={
    portal : require('/lib/xp/portal'),
    thymeleaf : require('/lib/xp/thymeleaf'),
    util : require('/lib/enonic/util')
};

var view = resolve('banner.html');

exports.get = function(req){
    
    var component = libs.portal.getComponent();
    var config = component.config;
    
    
    var model = {
        image : config.bannerImage,
        text : config.bannerText,
        url : config.bannerUrl,
        color : config.bannerBackgroundCol
    };

    libs.util.log(model.image);

    var body = libs.thymeleaf.render(view, model);
    return{ body: body};
};