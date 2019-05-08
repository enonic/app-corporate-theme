var libs = {
    portal:    require('/lib/xp/portal'),
    thymeleaf: require('/lib/thymeleaf'),
    content:   require('/lib/xp/content'),
    util:      require('/lib/util'),
    shared:    require('/lib/shared'),
    portfolio: require('/site/content-types/portfolio')
};

var view = resolve("portfolio.html");

var CONTENT_TYPE_PORTFOLIO = app.name + ':portfolio';


exports.get = function(req) {
    var contents = libs.shared.getContents(CONTENT_TYPE_PORTFOLIO, function() {
        return libs.shared.getAllWithinSite(CONTENT_TYPE_PORTFOLIO);
    });

    var portfolios = [];
    for(var j = 0; j < contents.length; j++ ) {
        var portfolioModel = libs.portfolio.getPortfolioModelFromContent(contents[j]);
        portfolioModel.uniqueId = 'portfolioItem' + (j+1);
        portfolios.push(portfolioModel);
    }

    var model = { portfolioList: portfolios };

    return { body: libs.thymeleaf.render(view, model) };
}; // exports.get
