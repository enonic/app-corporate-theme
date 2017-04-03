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


    var portfolios = libs.content.query({
        start : 0,
        count : 300,
        sort : "modifiedTime DESC",
        contentTypes : [
            app.name + ":portfolio"
        ],
        query : "_path LIKE '/content" + sitePath + "/*'"
    });

    var portfolioResults = portfolios.hits;
    var portfolioList = libs.shared.getPortfolioData(portfolioResults);

    var model = {
        portfolioList : portfolioList || null
    };

    var body = libs.thymeleaf.render(view, model);
    return { body : body};
};
