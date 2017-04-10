var libs = {
    portal: require('/lib/xp/portal'),
    thymeleaf: require('/lib/xp/thymeleaf'),
    content: require('/lib/xp/content'),
    util: require('/lib/enonic/util')
};

var view = resolve('employees.html');

exports.get = function(){

    var component = libs.portal.getComponent();
    var config = component.config;
    var employees = [];
    var facebookUrl = null;
    var twitterUrl = null;
    var linkedinUrl = null;
    var googleUrl = null;

    var employeesArray = config.team ? libs.util.data.forceArray(config.team) : null;
    if (employeesArray) {
        for(var i=0 ; i < employeesArray.length; i++) {
            var employeeKey = libs.content.get({
                key: employeesArray[i]
            });

			if (employeeKey) {
			var selected = employeeKey.data.socialLinks._selected;
				var socialLinks = employeeKey.data.socialLinks;

					// Check for use of social links
	            if (selected.indexOf("twitter") >= 0) {
	                twitterUrl = socialLinks.twitter.twitterUrl;
	            }
	            if (selected.indexOf("facebook") >= 0) {
	                facebookUrl = socialLinks.facebook.facebookUrl;
	            }
	            if (selected.indexOf("linkedin") >= 0) {
	                linkedinUrl = socialLinks.linkedin.linkedinUrl;
	            }
	            if (selected.indexOf("google") >= 0) {
	                googleUrl = socialLinks.google.googleUrl;
	            }

					var imageUrl = null;
					if (employeeKey.data.photo) {
						imageUrl = libs.portal.imageUrl({
							 id: employeeKey.data.photo,
							 scale: 'block(250,167)',
						});
					}

	            var employeeObject = {
	                photo: imageUrl,
	                name: employeeKey.displayName,
	                intro: employeeKey.data.intro,
	                facebookUrl: facebookUrl,
	                twitterUrl: twitterUrl,
	                linkedinUrl: linkedinUrl,
	                googleUrl: googleUrl
	            };

	            employees.push(employeeObject);
				}
        }
    }

    var model = {
		titleEmployee : config.titleEmployee || null,
        employees : employees
    };

    var body = libs.thymeleaf.render(view, model);
    return { body : body };
};
