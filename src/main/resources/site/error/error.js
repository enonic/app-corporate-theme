var thymeleaf = require('/lib/xp/thymeleaf');
var util = require('/lib/enonic/util');

var viewError = resolve('error.html');
var view404= resolve('err404.html');

exports.handle404 = function (err) {
    var body = thymeleaf.render(view404, {});

    util.log(err);
    
    return {
        contentType: 'text/html',
        body: body
    }
};

exports.handleError = function(err){
    var model = {
        errStatus :  err.status,
        errMsg : err.message
    }
    var body = thymeleaf.render(viewError, model);
    return {body : body}
};