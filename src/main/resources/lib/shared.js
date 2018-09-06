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

exports.mapBootstrapColumns = function(percentage) {
	var column = null, columnClass = null;
	switch(percentage) {
		 case '20': column = 2; break;
		 case '25': column = 3; break;
		 case '30': column = 3; break;
		 case '33': column = 4; break;
		 case '40': column = 5; break;
		 case '50': column = 6; break;
		 case '60': column = 7; break;
		 case '70': column = 9; break;
		 case '80': column = 10; break;
	}
	if (column) {
		columnClass = "col-md-" + column;
	}
	return columnClass;
};
