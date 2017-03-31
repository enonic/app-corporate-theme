var libs = {
    portal : require('/lib/xp/portal'),
    thymeleaf : require('/lib/xp/thymeleaf'),
    util : require('/lib/enonic/util')
};

var view = resolve('layout-2-col.html');

exports.get = function(req){

   var component = libs.portal.getComponent();
    
    var columnConfig = component.config.layoutConf;
    var leftCol;
    var rightCol;

    switch(columnConfig) {
        case '30-70' :
            leftCol= 4;
            rightCol = 8;
            break;
        case '70-30' :
            leftCol = 8;
            rightCol = 4;
            break;
        default:
            leftCol = 6;
            rightCol = 6;
    }
    
    var model = {
        leftRegion : component.regions["left"],
        rightRegion : component.regions["right"],
        leftCol : 'span' + leftCol,
        rightCol : 'span' + rightCol
    };

    var body = libs.thymeleaf.render(view, model);
    return {body : body};
};