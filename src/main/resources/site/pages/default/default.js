var libs = {
    portal : require('/lib/xp/portal'),
    thymeleaf : require('/lib/xp/thymeleaf'),
    content : require('/lib/xp/content'),
    menu : require('/lib/enonic/menu'),
    util : require('/lib/enonic/util')
};

var view = resolve('default.html');

function getBreadcrumbMenu(params) {
	var content = libs.portal.getContent();
	var site = libs.portal.getSite();
	var breadcrumbMenu = [];
	var item = {};
	// Add Home button linking to site home if text for it is sent in
	if (params.homeItem) {
		if (params.homeItem.show) {
			var homeUrl = libs.portal.pageUrl({
				path: site._path,
				type: 'absolute'
			});
			item = {
				text: params.homeItem.text || site.displayName,
				url: homeUrl,
				active: (content._path === site._path)
			};
			breadcrumbMenu.push(item);
			//log.info("Home added - ");
			//libs.util.log(breadcrumbMenu);
		}
	}
/*
	// Add URL to current item
	item = {};
	item.text = content.displayName;
	if (params.activeItem) {
		if (params.activeItem.link) {
			item.url = libs.portal.pageUrl({ path: content._path });
		}
	}
	breadcrumbMenu.push(item);
	log.info("Current item added - ");
	libs.util.log(breadcrumbMenu);
	libs.util.log(content);
*/
	// Not on frontpage, adding more things
	if (content._path != site._path) {
//		item = {};
		var fullPath = content._path;
		log.info(fullPath);
		var arrVars = fullPath.split("/");
		var arrLength = arrVars.length;
		for (var i = 1; i < arrLength; i++) {
			var lastVar = arrVars.pop();
			log.info(lastVar);
			if ( lastVar != '' ) {
				var curItem = libs.content.get({ key: arrVars.join("/") + "/" + lastVar });
				//libs.util.log(curItem);
				if (curItem) {
					var item = {};
					var curItemUrl = libs.portal.pageUrl({
						path: curItem._path,
						type: 'absolute'
					});
					item.text = curItem.displayName;
					if (content._path === curItem._path) {
						item.active = true;
					} else {
						item.active = false;
						item.url = curItemUrl;
					}
					breadcrumbMenu.push(item);
				};
			}
		}
	}

	return breadcrumbMenu;
}

//Handle Get request
exports.get = function(req){

    var content = libs.portal.getContent();
    var site = libs.portal.getSite();
	 var siteConfig = libs.portal.getSiteConfig();
    var mainRegion = content.page.regions["main"];
    var menuItems = libs.menu.getMenuTree(2);

	 var breadcrumbs = getBreadcrumbMenu({
		 activeItem: {
			 link: false
		 },
		 homeItem: {
			 show: true, // Automatically uses displayName if not overwritten here
			 text: "Homepage"
		 }
	 });
	 //log.info("Result -");
	// libs.util.log(breadcrumbs);

	 var showTitle = false;

    //Fetching site logo
    if (siteConfig.logo) {
        var logoKey = libs.content.get({
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
    var items = [];
    var companyItems = siteConfig.items ? libs.util.data.forceArray(siteConfig.items) : null;
    if(companyItems) {
        for (var j = 0; j < companyItems.length; j++) {
            var itemKey = libs.content.get({
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
    var column1  = {
        title : siteConfig.title,
        address : siteConfig.address,
        email : siteConfig.email,
        phone : siteConfig.phone,
    };
    var column2  = {
        title : siteConfig.title2,
        items : items,
    };
    var column3  = {
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
    var siteUrl = libs.portal.pageUrl({
        path: site._path
    });
    var model = {
        logo : logo,
        site : site,
        siteUrl: siteUrl,
        showTitle : showTitle,
        pageTitle: content.displayName + " | " + site.displayName,
        breadcrumbTitle: content.displayName,
		  breadcrumbs: breadcrumbs,
        footer : footer,
        mainRegion : mainRegion,
        menuItems : menuItems
    };
    var body = libs.thymeleaf.render(view, model);
    return { body : body};
};
