var libs={
    portal : require('/lib/xp/portal'),
    thymeleaf : require('/lib/xp/thymeleaf'),
    contentLib : require('/lib/xp/content'),
    util : require('/lib/enonic/util')
};

var view = resolve('slider.html');

exports.get = function(req){
    
    var component = libs.portal.getComponent();
    var banners = [];
    var config = component.config.banner ? libs.util.data.forceArray(component.config.banner) : null;

    if(config){
        for(var i = 0; i < config.length; i++){
            var image = null;
            var hit = config[i];
            var imageKey = libs.contentLib.get({
                key : hit.image
            });
            if(imageKey){
                image = libs.portal.imageUrl({
                    id: imageKey._id,
                    scale: 'width(600)'
                });
            }
            var result = {
                image : image,
                title : hit.title1,
                secondTitle : hit.title2,
                url : hit.url,
                color : hit.bannerBackgroundCol,
                item : "item" + (i+1)
            };

            banners.push(result);
        }
    }


    var model = {
       banners : banners
    };

    var body = libs.thymeleaf.render(view, model);
    return{ body: body};
};