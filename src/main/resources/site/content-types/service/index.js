var libs = {
    portal: require('/lib/xp/portal')
};


exports.getServicesModelFromContent = function(content) {
    return {
        icon:     content.data.serviceIcon ? 'icon-' + content.data.serviceIcon : null, // TODO: Default fallback icon?
        title:    content.displayName,
        intro:    content.data.serviceIntro ? content.data.serviceIntro : null,
        readMore: libs.portal.pageUrl({ path: content._path })
    };
} // function getServicesModelFromContent
