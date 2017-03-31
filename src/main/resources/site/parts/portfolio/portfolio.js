var libs = {
    portal : require('/lib/xp/portal'),
    thymeleaf : require('/lib/xp/thymeleaf'),
    content : require('/lib/xp/content'),
    util : require('/lib/enonic/util'),
    shared : require('/lib/shared')
};

//Setting
var view = resolve("portfolio.html");

exports.get = function(req){

    var component = libs.portal.getComponent();
    var config = component.config;
    var content = libs.portal.getContent();
    var currentSite = libs.portal.getSite();
    var sitePath = currentSite._path;
    var portfolioList = [];

    var portfolios = libs.content.query({
        start : 0,
        count : 300,
        sort : "modifiedTime DESC",
        contentTypes : [
            app.name + ":portfolio"
        ],
        query : "_path LIKE '/content" + sitePath + "/*'"
    });

    if (portfolios) {
        for (var i=0; i < portfolios.hits.length; i++) {
            var hit = portfolios.hits[i];

            var imageKey = libs.content.get({
                key : hit.data.portfolioImage
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
            portfolioObj.title = hit.displayName,
            portfolioObj.intro = hit.data.portfolioIntro,
            portfolioObj.url = hit.data.portfolioUrl,
				portfolioObj.uniqueId = "portfolioItem" + (i+1)

				portfolioList.push(portfolioObj);
        }
    }

    var model = {
        portfolioList : portfolioList || null
    };

    var body = libs.thymeleaf.render(view, model);
    return { body : body};
};
