var libs={
    portal : require('/lib/xp/portal'),
    thymeleaf : require('/lib/xp/thymeleaf'),
    contentLib : require('/lib/xp/content'),
    util : require('/lib/enonic/util')
};

var view = resolve('about.html');

exports.get = function(){

    var config = libs.portal.getComponent().config;
    var employees = [];
    var facebookUrl = null;
    var twitterUrl = null;
    var linkedinUrl = null;
    var googleUrl = null;


    var employeesArray = config.team ? libs.util.data.forceArray(config.team) : null;
    if(employeesArray){
        for(var i=0 ; i <employeesArray.length; i++) {
            var employeeKey = libs.contentLib.get({
                key: employeesArray[i]
            });

            var selected = employeeKey.data.socialLinks._selected;

            if (selected.indexOf("twitter") >= 0) {
                twitterUrl = employeeKey.data.socialLinks.twitter.twitterUrl;
            }

            if (selected.indexOf("facebook") >= 0) {
                facebookUrl = employeeKey.data.socialLinks.facebook.facebookUrl;
            }

            if (selected.indexOf("linkedin") >= 0) {
                linkedinUrl = employeeKey.data.socialLinks.linkedin.linkedinUrl;
            }

            if (selected.indexOf("google") >= 0) {
                googleUrl = employeeKey.data.socialLinks.google.googleUrl;
            }

            var employeeObject = {
                photo: libs.portal.imageUrl({
                    id: employeeKey.data.photo,
                    scale: 'block(250,167)',
                }),
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

    var model = {
        title1 : config.title1 || null,
        text1 : config.text1 || null,
        employees : employees,
        title2 :config.title2 || null,
        text2 : config.text2 || null
    };

    var body = libs.thymeleaf.render(view, model);
    return {body : body};
};