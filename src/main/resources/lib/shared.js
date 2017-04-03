var libs = {
    portal : require('/lib/xp/portal'),
    content : require('/lib/xp/content'),
    util : require('/lib/enonic/util')
};

// Local library
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

exports.getServiceData = function(services){
    var serviceList = [];
    var icon = null;
    var readMore = null;
    var content = libs.portal.getContent();
    var currentPath = content._path;
    var sitePath = libs.portal.getSite()._path;

    for(var i=0; i <services.length; i++){
        var hit = services[i];

        if(currentPath == sitePath){
            var iconMedium = hit.data.iconFrontPage || "globe";
            icon = "icon-" + iconMedium + " icon-medium";
        } else {
            var iconLarge = hit.data.iconServicePage || "bar-chart";
            icon = "icon-" + iconLarge + " icon-large";
            readMore = libs.portal.pageUrl({
                path : hit._path
            });
        }

        var serviceObj = {
            icon : icon,
            title : hit.displayName,
            intro : hit.data.serviceIntro ? hit.data.serviceIntro : null,
            readMore : readMore
        };

        if(serviceObj){
            serviceList.push(serviceObj);
        }
    }
    return serviceList;
};
