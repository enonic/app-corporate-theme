var thymeleaf = require('/lib/xp/thymeleaf');
var util = require('/lib/enonic/util');

var view404= resolve('err404.html');
var viewGeneric = resolve('error.html');


exports.handle404 = function (err) {
    var body = thymeleaf.render(view404, {});
    util.log(err);
    return {
        contentType: 'text/html',
        body: body
    }
};

exports.handleError = function(err){

    var debugMode = err.request.params.debug === 'true';
    if (debugMode && err.request.mode === 'preview'){
        return;
    }
    
    var model = {
        errorCode : err.status
    };
    var body = thymeleaf.render(viewGeneric, model);
    return { body : body}
};