var libs = {
    portal : require('/lib/xp/portal'),
    thymeleaf : require('/lib/xp/thymeleaf'),
    contentLib : require('/lib/xp/content'),
    menu : require('/lib/enonic/menu'),
    util : require('/lib/enonic/util')
};

//Setting
var view = resolve('default.html');

//Handle Get request
exports.get = function(req){

    var site = libs.portal.getSite();
    var content = libs.portal.getContent();
	 var siteConfig = libs.portal.getSiteConfig();

    var showTitle = false;
    var mainRegion = content.page.regions["main"];

    //Fetching site logo
	 if (siteConfig.logo) {
	    var logoKey = libs.contentLib.get({
	        key : siteConfig.logo
	    });
		 if (logoKey) {
		    var logo = libs.portal.imageUrl({
		        id : siteConfig.logo,
		        scale : 'block(220,80)'
		    });
		 }
	 }
    var sitePath = site._path;
    var currentPath = content._path;

    if (sitePath === currentPath) {
        showTitle = true;
    }

    //Footer content
    //Fetching social media's icons
    var icons = siteConfig.SocialIcon ? libs.util.data.forceArray(siteConfig.SocialIcon) : null;
    var iconsList = [];
    if(icons){
        for (var i = 0; i < icons.length; i++){
            var iconClass = "icon-" + icons[i];
             iconsList.push(iconClass);
        }
    }

    //Fetching contact information
    var contact = siteConfig.contact;
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

    var companyItems = siteConfig.items ? libs.util.data.forceArray(siteConfig.items) : null;
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

// footer object
    var footer = {
        text : siteConfig.footerText,
        icon : iconsList,
        title : siteConfig.title,
        contactsInfo : contactsInfo,
        title2 : siteConfig.title2,
        items : items
    };

    var model = {
        logo : logo,
        site : libs.portal.getSite(),
        showTitle : showTitle,
        pageTitle : content.displayName,
        footer : footer,
        mainRegion : mainRegion,
        menuItems : libs.menu.getMenuTree(2)
    };

    var body = libs.thymeleaf.render(view, model);
    return { body : body};
};
