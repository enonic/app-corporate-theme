var libs = {
    portal : require('/lib/xp/portal'),
    content : require('/lib/xp/content'),
    util : require('/lib/enonic/util')
};

exports.getPortfolioData = function(portfolios) {
    var portfolioList = [];
    var image = null;
    var imageFull = null;
    for (var i=0; i < portfolios.length; i++) {
        var hit = portfolios[i];

        var imageKey = libs.content.get({
        key : hit.data.portfolioImage
    });

    if(imageKey) {
      image = libs.portal.imageUrl({
            id : imageKey._id,
            scale: 'block(270,203)', // Thumbnail
        });
      imageFull = libs.portal.imageUrl({
            id: imageKey._id,
            scale: 'block(1024,768)', // Full size (opens in modal)
        });
    }

    var portfolioObj = {
        title : hit.displayName,
        intro : hit.data.portfolioIntro,
        url : hit.data.portfolioUrl,
        image : image,
        imageFull : imageFull,
        uniqueId : "portfolioItem" + (i+1)
    };
        portfolioList.push(portfolioObj);
    }

    return portfolioList;
};


exports.getAllWithinSite = function(contentType) {
    return libs.content.query({
        contentTypes: [contentType],
        count: -1,
        query : "_path LIKE '/content" + libs.portal.getSite()._path + "/*'",
        sort : '_manualOrderValue DESC'
    }).hits;
};


exports.getContents = function(contentType, fallbackCallback) {
    var content = libs.portal.getContent();
    if (content.type === contentType) { return [content]; }

    if (content.type === 'portal:page-template') {
        return exports.getAllWithinSite(contentType);
    }

    return fallbackCallback();
}; // function getContents
