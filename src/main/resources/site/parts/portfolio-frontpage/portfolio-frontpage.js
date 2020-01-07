var libs = {
    portal:    require('/lib/xp/portal'),
    thymeleaf: require('/lib/thymeleaf'),
    content:   require('/lib/xp/content'),
    util:      require('/lib/util'),
    shared:    require('/lib/shared'),
    portfolio: require('/site/content-types/portfolio')
};

var view = resolve('portfolio-frontpage.html');

var CONTENT_TYPE_PORTFOLIO = app.name + ':portfolio';


exports.get = function(req) {
    var config = libs.portal.getComponent().config;

    var contents = libs.shared.getContents(CONTENT_TYPE_PORTFOLIO, function() {
        var ids = config.portfolio ? libs.util.data.forceArray(config.portfolio) : null;
        if(ids) {
            var _contents = [];
            for(var i = 0; i < ids.length; i++ ) {
                var content = libs.content.get({ key: ids[i] });
                content && _contents.push(content);
            }
            return _contents;
        }
    });

    var portfolios = [];
    for(var j = 0; j < contents.length; j++ ) {
        var portfolioModel = libs.portfolio.getPortfolioModelFromContent(contents[j]);
        portfolioModel.uniqueId = 'portfolioItem' + (j+1);
        portfolios.push(portfolioModel);
    }

    var model = {
        title : config.partTitle,
        intro : config.partIntro,
        portfolios : portfolios
    };

    return { body: libs.thymeleaf.render(view, model) };
}; // exports.get
