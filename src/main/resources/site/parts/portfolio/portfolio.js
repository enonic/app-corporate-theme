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

    var content = libs.portal.getContent();
    var currentSite = libs.portal.getSite();
    var sitePath = currentSite._path;
	var portfolioList =[];

    var portfolios = libs.content.query({
		key: content._id,
		start : 0,
        count : 100,
        sort : "_manualOrderValue DESC",
        contentTypes : [
            app.name + ":portfolio"
        ],
        query : "_path LIKE '/content" + sitePath + "/*'"
    });

	if (portfolios) {
		portfolioList = libs.shared.getPortfolioData(portfolios.hits);
    }

    var model = {
        portfolioList : portfolioList ? libs.util.data.forceArray(portfolioList) : null
    };

    var body = libs.thymeleaf.render(view, model);
    return { body : body };
};
