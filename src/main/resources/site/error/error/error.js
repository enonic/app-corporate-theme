var thymeleaf = require('/lib/xp/thymeleaf');

var view= resolve('page-not-found.html');

exports.handle404 = function (err) {

    // Handle debug mode and preview mode
    var debugMode = err.request.params.debug === 'true';
    if (debugMode && err.request.mode === 'preview') {
        return;
    }

    var siteConfig = libs.portal.getSiteConfig();
    var site = libs.portal.getSite();

    var redirectPageId = siteConfig.errorPage || site._id; 
    var redirectPageUrl = libs.portal.pageUrl({
        'id': redirectPageId
    });
    
    return {
        status: 404,
        redirect : redirectPageUrl
    }
};

exports.handleError = function (err) {
    var debugMode = err.request.params.debug === 'true';
    if (debugMode && err.request.mode === 'preview') {
        return;
    }
    
    var body = "Feil med serveren";

    return {
        contentType: 'text/html',
        body: body
    }
};
