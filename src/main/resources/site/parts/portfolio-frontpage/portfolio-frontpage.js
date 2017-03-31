var libs = {
    portal : require('/lib/xp/portal'),
    thymeleaf : require('/lib/xp/thymeleaf'),
    contentLib : require('/lib/xp/content'),
    util : require('/lib/enonic/util'),
    shared : require('/lib/shared')
};

var view = resolve('portfolio-frontpage.html');

exports.get = function(req){

    var config = libs.portal.getComponent().config;
    var portfolios = [];
    var portfolioArray = config.portfolio ? libs.util.data.forceArray(config.portfolio) : null;

    if(portfolioArray){
        for(var i = 0; i < portfolioArray.length; i++ ){
            var portfolioKey = libs.contentLib.get({
                key : portfolioArray[i]
            });

            if(portfolioKey){
                var image = libs.portal.imageUrl({
                    id : portfolioKey.data.portfolioImage,
                    scale: 'block(1024,768)',
                });

                var portfolioObject = {
                    portfolioImage : image,
                    portfolioTitle : portfolioKey.data.portfolioTitle,
                    portfolioIntro : portfolioKey.data.portfolioIntro

                };

                if(portfolioObject){
                    portfolios.push(portfolioObject );
                }
            }
        }
    }
    var model = {
        title : config.partTitle,
        intro : config.partIntro,
        portfolios : portfolios
    };
    var body = libs.thymeleaf.render(view, model);
    return {body : body};

};
