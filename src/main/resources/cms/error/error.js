var libs = {
	thymeleaf: require('/lib/thymeleaf')
};

var viewError = resolve('error.html');
var view404 = resolve('err404.html');

exports.handle404 = function (err) {
    var body = libs.thymeleaf.render(view404, {});
    return { body: body }
};

exports.handleError = function(err) {
    var debugMode = err.request.params.debug === 'true';
    if (debugMode && err.request.mode === 'preview') {
        return;
    }
    var model = {
        errStatus :  err.status,
        errMsg : err.message
    };
    var body = libs.thymeleaf.render(viewError, model);
    return { body : body };
};
