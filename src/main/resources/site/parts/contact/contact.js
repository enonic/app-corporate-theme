var libs={
    portal : require('/lib/xp/portal'),
    thymeleaf : require('/lib/xp/thymeleaf'),
    contentLib : require('/lib/xp/content'),
    util : require('/lib/enonic/util'),
    mailLib : require('/lib/xp/mail')
};

var postView = resolve('response.html');
var view = resolve('contact.html');

//Post method
exports.post = function(req){
    var config = libs.portal.getComponent().config;
    var contactInfo = null;

    if(emailValidation(req.params.email) && req.params.message) {
        contactInfo = {
            firstName : req.params.firstName,
            lastName : req.params.lastName,
            msg : req.params.message,
            email : req.params.email
        };
    }

    try{
        var mail = libs.mailLib.send({
            from : contactInfo.email,
            to : config.emailReceiver,
            subject : "Message",
            body : contactInfo.msg
        });
    }
    catch(err) {
        libs.util.log("Mail configuration does not set properly. Check out app's read me for details.");
    }

    var body = libs.thymeleaf.render(postView, null);
    return {body : body};
};


//Get method
exports.get = function(req){
    var config = libs.portal.getComponent().config;
    var siteConfig = libs.portal.getSiteConfig();

    var model = {
        text : config.text ? config.text : null ,
        address : siteConfig.address ||  null ,
        email : siteConfig.email || null ,
        phone : siteConfig.phone || null
    };

    var body = libs.thymeleaf.render(view, model);
    return {body : body};
};


// emailValidation function
function emailValidation(email){
    var regVal = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regVal.test(email);
};

