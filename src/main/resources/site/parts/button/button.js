var libs = {
    portal : require('/lib/xp/portal'),
    thymeleaf : require('/lib/xp/thymeleaf'),
    content : require('/lib/xp/content'),
    util : require('/lib/enonic/util')
};
var view = resolve("button.html");

exports.get = function(req){
    var config = libs.portal.getComponent().config;
    var btnUrl = "#";

	if (config.url) {
		if (config.url._selected === 'content') {
			var btnKey = config.url.content.key;
			if (btnKey) {
                btnUrl = libs.portal.pageUrl({
                    id : btnKey
                });
            }
		} else if (config.url._selected === 'text') {
			btnUrl = config.url.text.url;
		}
	}

    var model = {
        btnText : config.btnText || "Click Here",
        btnColor : config.btnColor || null,
        btnUrl : btnUrl
	};

    return { body : libs.thymeleaf.render(view, model) };
};
