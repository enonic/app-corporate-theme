var libs = {
    portal : require('/lib/xp/portal'),
    thymeleaf : require('/lib/xp/thymeleaf'),
    util : require('/lib/enonic/util')
};

var view = resolve('layout-2-col.html');

exports.get = function(req){

    var component = libs.portal.getComponent();
    var config = component.config;
    var columnConfig = config.layoutConf;
    var leftCol;
    var rightCol;

    switch(columnConfig) {
        case '30-70' :
            leftCol= 3;
            rightCol = 9;
            break;
        case '70-30' :
            leftCol = 9;
            rightCol = 3;
            break;
        default:
            leftCol = 6;
            rightCol = 6;
    }


    var fullWidth = config.fullWidth ? "fullWidth" : "";

    libs.util.log(fullWidth);

    var model = {
        leftRegion : component.regions["left"],
        rightRegion : component.regions["right"],
        leftCol : 'col-md-' + leftCol,
        rightCol : 'col-md-' + rightCol,
        fullWidth : fullWidth
    };

    var body = libs.thymeleaf.render(view, model);
    return {body : body};
};