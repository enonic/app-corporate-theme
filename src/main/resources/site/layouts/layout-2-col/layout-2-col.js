var libs = {
    portal : require('/lib/xp/portal'),
    thymeleaf : require('/lib/xp/thymeleaf')
};

var view = resolve('layout-2-col.html');

exports.get = function(req){

   var component = libs.portal.getComponent();
    var model = {
        leftRegion : component.regions["left"],
        rightRegion : component.regions["right"]
    };
    
    var body = libs.thymeleaf.render(view, model);
    return {body : body};
};