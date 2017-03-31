var libs = {
    portal : require('/lib/xp/portal'),
    thymeleaf : require('/lib/xp/thymeleaf'),
    content : require('/lib/xp/content'),
    util : require('/lib/enonic/util'),
    shared : require('/lib/shared')
};

var view = resolve('portfolio-frontpage.html');

exports.get = function(req){

    var config = libs.portal.getComponent().config;
    var portfolioList = [];
    var portfolioArray = config.portfolio ? libs.util.data.forceArray(config.portfolio) : null;

    if(portfolioArray){
        for(var i = 0; i < portfolioArray.length; i++ ){
            var portfolioItem = libs.content.get({
                key : portfolioArray[i]
            });

            if (portfolioItem){
					var imageKey = libs.content.get({
	                key : portfolioItem.data.portfolioImage
	            });
					var portfolioObj = {};

	 				if (imageKey) {
	                portfolioObj.image = libs.portal.imageUrl({
	                   id : imageKey._id,
	                   scale: 'block(270,203)', // Thumbnail
	                }),
	                portfolioObj.imageFull = libs.portal.imageUrl({
	                   id: imageKey._id,
	                   scale: 'block(1024,768)', // Full size (opens in modal)
	                })
	 				}
	            portfolioObj.title = portfolioItem.displayName,
	            //portfolioObj.intro = portfolioItem.data.portfolioIntro,
	            portfolioObj.url = portfolioItem.data.portfolioUrl,
	 				portfolioObj.uniqueId = "portfolioItem" + (i+1)

					portfolioList.push(portfolioObj);
            }
        }
    }
    var model = {
        title : config.partTitle,
        intro : config.partIntro,
        portfolios : portfolioList
    };
    var body = libs.thymeleaf.render(view, model);
    return {body : body};

};
