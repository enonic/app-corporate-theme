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
    var portfolioItems = [];
    var portfolioArray = config.portfolio ? libs.util.data.forceArray(config.portfolio) : null;

    if(portfolioArray) {

        for (var i = 0; i < portfolioArray.length; i++) {
            var portfolioItem = libs.content.get({
                key: portfolioArray[i]
            });

            portfolioItems.push(portfolioItem);
        }
    }

    var portfolioList = libs.shared.getPortfolioData(portfolioItems);

    var model = {
        title : config.partTitle,
        intro : config.partIntro,
        portfolios : portfolioList
    };
    var body = libs.thymeleaf.render(view, model);
    return {body : body};

};
