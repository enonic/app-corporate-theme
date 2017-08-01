var libs = {
    portal : require('/lib/xp/portal'),
    content : require('/lib/xp/content')
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
