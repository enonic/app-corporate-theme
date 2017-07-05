var libs={
    portal : require('/lib/xp/portal'),
    thymeleaf : require('/lib/xp/thymeleaf'),
    content : require('/lib/xp/content'),
    util : require('/lib/enonic/util')
};

var view = resolve('slider.html');

exports.get = function(req){

    var component = libs.portal.getComponent();
    var banners = [];
    var slides = component.config.banner ? libs.util.data.forceArray(component.config.banner) : null;

    if(slides){
        for(var i = 0; i < slides.length; i++){
            var image, imageKey;
            var hit = slides[i];
			if (hit.image) {
	            imageKey = libs.content.get({
	                key : hit.image
	            });
			}
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
                backgroundColor : hit.backgroundColor
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
