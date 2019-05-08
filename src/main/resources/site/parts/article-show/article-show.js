var libs = {
    thymeleaf: require('/lib/thymeleaf'),
    content: require('/lib/xp/content'),
    portal: require('/lib/xp/portal'),
    util: require('/lib/util'),
    moment: require('/assets/momentjs/2.20.1/min/moment-with-locales.min.js')
};

var view = resolve('article-show.html');


exports.get = function(req){
    var component = libs.portal.getComponent();
    var content = libs.portal.getContent();

		// Reset empty content to insert placeholder text for when viewing a template.
		if (content.type === app.name + ':article') {
			if (content.data.headerImage) {
				// Get the full image object, for accessing metadata
				var image = libs.content.get({
					key: content.data.headerImage
				});
				if (image) {
					var imageUrl = libs.portal.imageUrl({
						id:    content.data.headerImage,
						scale: 'block(850,350)'
					});
					content.data.image = {
						displayName: image.displayName,
						caption: image.data.caption,
						url: imageUrl
					};

				}
			}

			var published = content.publish.from || content.modifiedTime;
			content.data.published = libs.moment(published).format('MMMM Do YYYY, h:mm a');

			// Handle empty fields, improved UX for new users.
			if (!content.data.preface ) {
				content.data.preface = "TODO: Please write a short preface for this article. Please do so in the form to the left side in Content Studio.";
			}
			if (!content.data.body) {
				content.data.body = "<p>TODO: You need to write a body text for this type of content. Please do so in the form to the left side in Content Studio.</p>";
			}
			// Related content author needs to be fetched and added to the main content data.
			if (content.data.author) {
				var authorsHolder = [];
				var authors = libs.util.data.forceArray(content.data.author); // Single selections will come out as strings, multiple as arrays. That makes our Thymeleaf complicated, so let's always force this data into arrays so our Thymeleaf can expect to loop if there's any data.
				for (var i = 0; i < authors.length; i++) {
					var author = libs.content.get({
						key: authors[i]
					});
					if (author) {
						var data = {
							id: authors[i],
							displayName: author.displayName
						};
						authorsHolder.push(data);
					}
				}
				content.data.authors = authorsHolder;
			}
		} else {
			content = {
				displayName: "No News Article found!",
            data: {
                preface: "This template is used to preview contents of the type News Article.",
					 body: "<p>You need to create a new content in Content Studio, preferably under the page 'News', but you are free to place it elsewhere too. After that, any preview for that content will be using this template.</p>"
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
