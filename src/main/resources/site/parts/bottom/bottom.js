var libs={
    portal : require('/lib/xp/portal'),
    thymeleaf : require('/lib/xp/thymeleaf'),
    contentLib : require('/lib/xp/content'),
    util : require('/lib/enonic/util')
};

var view = resolve('bottom.html');

exports.get = function(){

    var config = libs.portal.getComponent().config;
    var contact = config.contact;
    var contactsInfo = [];
    var items = [];


    if(contact){
        for (var i = 0; i < contact.length ; i++){
            var contactObject  = {
                icon : contact[i].icon,
                text : contact[i].text
            };
            if(contactObject){
                contactsInfo.push(contactObject);
            }
        }
    }

    var companyItems = config.items ? libs.util.data.forceArray(config.items) : null;

    if(companyItems) {
        for (var j = 0; j < companyItems.length; j++) {
            var itemKey = libs.contentLib.get({
                key : companyItems[j]
            });

            var companyObject = {
                name : itemKey.displayName,
                url : libs.portal.pageUrl({
                    path : itemKey._path
                })
            };
            items.push(companyObject);
        }
    }

    var model = {
        title : config.title,
        contactsInfo : contactsInfo,
        title2 : config.title2,
        items : items
    };
    
    var body = libs.thymeleaf.render(view, model);
    return {body : body};
};