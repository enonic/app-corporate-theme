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
<<<<<<< Updated upstream
	 var menuItems = libs.menu.getMenuTree(2);
=======
    var siteConfig = libs.portal.getSiteConfig();
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
    //Fetching social media's icons
    var icons = siteConfig.SocialIcon ? libs.util.data.forceArray(siteConfig.SocialIcon) : null;
    var iconsList = [];
    if(icons){
        for (var i = 0; i < icons.length; i++){
            var iconClass = "icon-" + icons[i];
             iconsList.push(iconClass);
        }
    }

=======
    
>>>>>>> Stashed changes
    //Fetching contact information

    var items = [];

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


var column1  = {
    title : siteConfig.title,
    address : siteConfig.address,
    email : siteConfig.email,
    phone : siteConfig.phone,

};

var column2  = {
    title : siteConfig.title2,
    items : items,
};

var column3  = {
    title : siteConfig.title3,
    freeText : siteConfig.freeText,
};

var socialUrls = {
    facebook : siteConfig.facebook || null,
    twitter : siteConfig.twitter || null,
    pinterest : siteConfig.pinterest || null,
    linkedin : siteConfig.linkedin || null,
    googleplus : siteConfig.googleplus || null,
    youtube : siteConfig.youtube || null,
    tumblr : siteConfig.tumblr || null,
    instagram : siteConfig.instagram || null
};

// footer object
    var footer = {
        column1 : column1,
        column2 : column2,
        column3 : column3,
        footerText : siteConfig.footerText,
        socialUrls : socialUrls

    };
<<<<<<< Updated upstream
	 var siteUrl = libs.portal.pageUrl({
		 path: site._path
	 });
=======
>>>>>>> Stashed changes

    var model = {
        logo : logo,
        site : site,
		  siteUrl: siteUrl,
        showTitle : showTitle,
        pageTitle : content.displayName + " | " + site.displayName,
        footer : footer,
        mainRegion : mainRegion,
        menuItems : menuItems
    };

    var body = libs.thymeleaf.render(view, model);
    return { body : body};
};
