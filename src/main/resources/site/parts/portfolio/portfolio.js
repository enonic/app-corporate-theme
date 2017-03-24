var libs = {
    portal : require('/lib/xp/portal'),
    thymeleaf : require('/lib/xp/thymeleaf'),
    contentLib : require('/lib/xp/content'),
    util : require('/lib/enonic/util')
};

//Setting
var view = resolve("portfolio.html");

exports.get = function(req){
    
    var config = libs.portal.getComponent().config;
    var content = libs.portal.getContent();
    var currentSite = libs.portal.getSite()._path;
    var portfolioList =[];

    var portfolios = libs.contentLib.query({
        start : 0,
        count : 300,
        sort : "modifiedTime DESC",
        contentTypes : [
            app.name + ":portfolio"
        ],
        query : "_path LIKE '/content" + currentSite + "/*'"
    });

    if(portfolios){
        for(var i=0; i <portfolios.hits.length; i++){
            var hit = portfolios.hits[i];

            var imageKey = libs.contentLib.get({
                key : hit.data.portfolioImage
            });
            var portfolioObj = {
                image : libs.portal.imageUrl({
                    id : imageKey._id,
                    scale: 'block(1024,768)',
                }),
                title : hit.data.portfolioTitle,
                intro : hit.data.portfolioIntro
            };

            if(portfolioObj){
                portfolioList.push(portfolioObj);
            }
        }
    }

    var model = {
        pageTitle : config.pageTitle,
        portfolioList : portfolioList ? portfolioList : null
    };
    
    var body = libs.thymeleaf.render(view, model);
    return { body : body};
};