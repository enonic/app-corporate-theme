var libs = {
    portal: require('/lib/xp/portal'),
    thymeleaf: require('/lib/thymeleaf'),
    content: require('/lib/xp/content'),
    util: require('/lib/enonic/util')
};

var view = resolve('employees.html');

var CONTENT_TYPE_EMPLOYEE = app.name + ':employee';


function getEmployeeContents(config) {
    var content = libs.portal.getContent();

    if (content.type === CONTENT_TYPE_EMPLOYEE) { return [content]; }

    if (content.type === 'portal:page-template') {
        return libs.content.query({
            contentTypes: [CONTENT_TYPE_EMPLOYEE],
            count: -1,
            query: ''
        }).hits;
    }

    var employeeIds = config.team ? libs.util.data.forceArray(config.team) : null;
    if (!employeeIds) { return [] };
    var employeeContents = [];
    for(var i=0; i < employeeIds.length; i++) {
        var employeeContent = libs.content.get({ key: employeeIds[i] });
        if (employeeContent) { employeeContents.push(employeeContent); }
    } // for employeeIds
    return employeeContents;
} // function getEmployeeContents()


function getEmployeesModel(employeeContents) {
    //log.debug('employeeContents:' + JSON.stringify(employeeContents, null, 4));
    var employees = [];
    for(var j=0; j < employeeContents.length; j++) {
        var employeeContent = employeeContents[j];
        var selected = (employeeContent.data.socialLinks && employeeContent.data.socialLinks._selected) ? employeeContent.data.socialLinks._selected : [];
        employees.push({
            photo: employeeContent.data.photo ? libs.portal.imageUrl({
                id: employeeContent.data.photo,
                scale: 'block(716,478)',
            }) : null,
            name:  employeeContent.displayName,
            intro: employeeContent.data.intro,
            facebookUrl: selected.indexOf('facebook') >= 0 ? employeeContent.data.socialLinks.facebook.facebookUrl : null,
            twitterUrl:  selected.indexOf('twitter')  >= 0 ? employeeContent.data.socialLinks.twitter.twitterUrl   : null,
            linkedinUrl: selected.indexOf('linkedin') >= 0 ? employeeContent.data.socialLinks.linkedin.linkedinUrl : null,
            googleUrl:   selected.indexOf('google')   >= 0 ? employeeContent.data.socialLinks.google.googleUrl     : null
        });
    } // for employeeContents
    return employees;
} // function getEmployeesModel


exports.get = function() {
    var config = libs.portal.getComponent().config;
    var model = {
        titleEmployee : config.titleEmployee || null,
        employees : getEmployeesModel(getEmployeeContents(config))
    };
    return { body : libs.thymeleaf.render(view, model) };
};
