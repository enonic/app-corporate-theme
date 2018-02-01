var libs = {
    thymeleaf: require('/lib/xp/thymeleaf'),
    content: require('/lib/xp/content'),
    portal: require('/lib/xp/portal'),
    util: require('/lib/enonic/util')
};

var view = resolve('article-show.html');


exports.get = function(req){
    var component = libs.portal.getComponent();
    var content = libs.portal.getContent();

		// Reset empty content to insert placeholder text for when viewing a template.
		if (content.type === app.name + ':article') {

		} else {
			content = {
				header: null,
				displayName: "No News Article found!",
            data: {
                preface: "This template is used to preview contents of the type News Article.",
					 body: "<p>You need to create a new content in Content Studio, preferably under the page 'News', but you are free to place it elsewhere too.</p>"
            }
        };
		}

    var params = {
        'content': content
    };

    return {
        body: libs.thymeleaf.render(view, params),
        contentType: 'text/html'
    }
};
