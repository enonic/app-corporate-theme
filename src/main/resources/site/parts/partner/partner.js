var libs = {
    portal : require('/lib/xp/portal'),
    thymeleaf : require('/lib/xp/thymeleaf'),
    contentLib : require('/lib/xp/content'),
    util : require('/lib/enonic/util')
};

var view = resolve('partner.html');

exports.get = function(req){

    var config = libs.portal.getComponent().config;
    var partnerLogos = config.partnerLogo ? libs.util.data.forceArray(config.partnerLogo) : null;
    var logosList = [];



    if(partnerLogos){
        for(var i = 0; i < partnerLogos.length; i++){
            var logoKey = libs.contentLib.get({
                key : partnerLogos[i]
            });

            libs.util.log(logoKey);

            var logo = libs.portal.imageUrl({
                id: logoKey._id,
                scale: 'block(1024,768)',
            });

            logosList.push(logo);
        }
    }

    var model = {
        title : config.title,
        intro : config.intro,
        logosList : logosList
    };


    var body = libs.thymeleaf.render(view , model);
    return {body: body};
};