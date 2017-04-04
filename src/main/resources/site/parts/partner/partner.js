var libs = {
    portal : require('/lib/xp/portal'),
    thymeleaf : require('/lib/xp/thymeleaf'),
    content : require('/lib/xp/content'),
    util : require('/lib/enonic/util')
};

var view = resolve('partner.html');

exports.get = function(req){

    var config = libs.portal.getComponent().config;
    var partnerLogos = config.partnerLogo ? libs.util.data.forceArray(config.partnerLogo) : null;
    var logosList = [];

    if(partnerLogos){
        for(var i = 0; i < partnerLogos.length; i++){
            var logoKey = libs.content.get({
                key : partnerLogos[i]
            });

            if(logoKey){
                var logo = libs.portal.imageUrl({
                    id: logoKey._id,
                    scale: 'block(1024,768)',
                });

                logosList.push(logo);
            }
        }
    }

    var model = {
        title : config.title || null,
        intro : config.intro || null,
        logosList : logosList
    };


    var body = libs.thymeleaf.render(view , model);
    return {body: body};
};