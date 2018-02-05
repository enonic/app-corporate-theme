var libs = {
	portal:    require('/lib/xp/portal'),
	thymeleaf: require('/lib/xp/thymeleaf'),
	content:   require('/lib/xp/content'),
	util:      require('/lib/enonic/util')
};
var view = resolve('article-list.html');

exports.get = function(req){
	var config = libs.portal.getComponent().config;

	// Contents of component.config:
	// .style    = block||list
	// .amount   = 1-10 amount
	// .articles = 0-5 promoted articles

	config = {
		style: config.style === 'list' ? 'list' : 'block',
		amount: config.amount || 3,
		articles: config.articles || null
	};

	var selectedIds = libs.util.data.forceArray(config.articles);
	var articles = libs.content.query({
		start: 0,
		count: config.amount,
		filters: {
			ids: {
				values: selectedIds
			}
		},
		contentTypes: [app.name + ':article']
	});

	for (var i = 0; i < articles.hits.length; i++) {
		articles.hits[i].data.published = articles.hits[i].publish.from || articles.hits[i].modifiedTime;
	}

	var params = {
		'config': config,
		'articles': articles.hits
	};

	return {
		body: libs.thymeleaf.render(view, params),
		contentType: 'text/html'
	};
};
