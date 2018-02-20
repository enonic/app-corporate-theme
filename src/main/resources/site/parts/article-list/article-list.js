var libs = {
	portal:    require('/lib/xp/portal'),
	thymeleaf: require('/lib/xp/thymeleaf'),
	content:   require('/lib/xp/content'),
	util:      require('/lib/enonic/util'),
	moment:    require('/assets/momentjs/2.20.1/min/moment-with-locales.min.js')
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

	var selectedIds = libs.util.data.trimArray( libs.util.data.forceArray(config.articles) );
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

//log.info(selectedIds.toString());

	// Selected IDs not enough to meet amount, do another query withot IDs.
	if (articles.count < config.amount) {
		var query = null;
		if (selectedIds.length > 0) {
			//log.info(selectedIds.length);
			query = "_id NOT IN ('" + selectedIds.join("', '") + "')";
			//log.info(query);
		}

		var moreArticles = libs.content.query({
			start: 0,
			count: config.amount - articles.count,
			query: query,
			/*filters: {
				boolean: {
					mustNot: {
	               hasValue: {
	                  field: "_id",
	                  values: selectedIds
	               }
	            }
				}
			},*/
			contentTypes: [app.name + ':article'],
			order: "publish.from DESC, createdTime DESC, modifiedTime DESC"
		});
		//libs.util.log(moreArticles);

		if (moreArticles.count > 0) {
			articles.hits = articles.hits.concat(moreArticles.hits);
		}
	}
//libs.util.log(articles);
	// Fintune the data before sending back to the view.
	for (var i = 0; i < articles.hits.length; i++) {
		if (articles.hits[i].displayName === '') { articles.hits[i].displayName = 'TODO - add display name!'; }
		var published = articles.hits[i].publish.from || articles.hits[i].modifiedTime;
		published = libs.moment(published).format('MMMM Do YYYY, h:mm a');
		articles.hits[i].data.published = published;
		articles.hits[i].data.url = libs.portal.pageUrl({
			'id': articles.hits[i]._id
		});
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
