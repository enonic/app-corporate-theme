var libs = {
	portal:    require('/lib/xp/portal'),
	thymeleaf: require('/lib/xp/thymeleaf'),
	content:   require('/lib/xp/content'),
	util:      require('/lib/enonic/util'),
	shared:    require('/lib/shared')
};
var view = resolve('article-list.html');

exports.get = function(req){
	var config = libs.portal.getComponent().config;

	// Contents of component.config:
	// .style    = block||list
	// .amount   = 1-10 amount
	// .articles = 0-5 promoted articles

	config = {
		style: config.style === 'inline' ? 'inline' : 'block',
		amount: config.amount || 3,
		articles: config.articles || null
	};

	var articles = libs.shared.getContents(app.name + ':article', function() {
		 var ids = config.articles ? libs.util.data.forceArray(config.articles) : null;
		 if(ids) {
			  var _articles = [];
			  for(var i = 0; i < ids.length; i++ ) {
					var article = libs.content.get({ key: ids[i] });
					article && _articles.push(article);
			  }
			  return _articles;
		 }
	});

	var params = {
		'config': config,
		'articles': articles
	};

	return {
		body: libs.thymeleaf.render(view, params),
		contentType: 'text/html'
	};
};
