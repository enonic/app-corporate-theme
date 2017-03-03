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

    var content = libs.portal.getContent();
    var mainRegion = content.page.regions["main"];
    var siteConfig = libs.contentLib.getSiteConfig({
        key: '/bootstrap-theme',
        applicationKey :  app.name
    });

    //Fetching site logo
    var logoKey = libs.contentLib.get({
        key : siteConfig.logo
    });
    var logo = libs.portal.imageUrl({
        id : logoKey._id,
        scale : 'block(220,80)'
        
    });

    
    //Fetching social media's icons
    var icons = siteConfig.SocialIcon ? libs.util.data.forceArray(siteConfig.SocialIcon) : null;
    var iconsList = [];

    
    
    if(icons){
        for (var i = 0; i < icons.length; i++){
            var iconClass = "icon-" + icons[i];
             iconsList.push(iconClass);
        }
    }
    
    var footer = {
        text : siteConfig.footerText,
        icon : iconsList
    };
    
    var model = {
        logo : logo,
        site : libs.portal.getSite(),
        footer : footer,
        mainRegion : mainRegion,
        menuItems : libs.menu.getMenuTree(2)
    };


    var body = libs.thymeleaf.render(view, model);
    return { body : body};
};