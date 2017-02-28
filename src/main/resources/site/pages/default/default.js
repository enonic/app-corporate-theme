var libs = {
    portal : require('/lib/xp/portal'),
    thymeleaf : require('/lib/xp/thymeleaf'),
    menu : require('/lib/enonic/menu'),
    //util : require('/lib/enonic/util')
};

//Setting
var view = resolve('default.html');

//Handle Get request
exports.get = function(req){

    var content = libs.portal.getContent();
    var mainRegion = content.page.regions["main"];
    
    var model = {
        mainRegion : mainRegion,
        menuItems : libs.menu.getMenuTree(2)
    };
    var body = libs.thymeleaf.render(view, model);
    return { body : body};
};