define(['jquery', 'underscore'], function($, _){
	var defaultNewTabData,
		template,
		Tabs;

	template = '<div class="tab">\n<div class="title"></div>\n<div class="close"></div>\n</div>';

	defaultNewTabData = {
		title: 'untitled',
		data: {}
	};

	var Tabs = function(options) {
		var self = this;

		this.shell = options.shell;
		
		$.extend(this.shell.data(), options);

		this.shell.find('.tab').each(function() {
			return $(this).data().tabData = {
				data: {}
			};
		});
	
		$(window).on('resize', _.debounce(function(){
			self.render()
		}, 300));

		this.bound = [];

		_.bindAll(this);
		this.render();
	}

	Tabs.prototype = {
		tabs: [],
		render: function() {
			var self = this;

			setTimeout(function(){
				self.fixTabSizes();
			}, 0);

			this.fixZIndexes();
			this.setupEvents();
		},
		setupSortable: function() {
			var tabs, self = this;
			tabs = this.shell.find('.tabs');
		
			return tabs.sortable({
				axis: 'x',
				tolerance: 'pointer',
				distance: 10,
				start: function(e, ui) {
					self.fixZIndexes();
					if (!$(ui.item).hasClass('current')) {
						return tabs.sortable('option', 'zIndex', $(ui.item).data().zIndex);
					} else {
						return tabs.sortable('option', 'zIndex', tabs.length + 40);
					}
				},
				stop: function(e, ui) {
					return self.setCurrent($(ui.item));
				}
			});
		},
		fixTabSizes: function() {
			var tabs, totalWidth, maxWidth, self = this;

			tabs = this.shell.find('.tab');

			tabs.css({maxWidth: '100%'});

			tabs.each(function() {
				$(this).width($(this).width());
			});

			setTimeout(function(){
				totalWidth = _.reduce(tabs, function(memo, tab) {
					return memo + $(tab).width() + 60;
				}, 0);

				if (totalWidth >= self.shell.width()) {
					maxWidth = (100 / (tabs.length));

					tabs.css({width: '-webkit-calc(' + maxWidth + '% - 60px)'});
				} else {
					tabs.css({width: 'auto'});
				}
			}, 0);
		},
		fixZIndexes: function() {
			var tabs;
			tabs = this.shell.find('.tab');

			return tabs.each(function(i) {
				var tab, zIndex;
				tab = $(this);
				zIndex = tabs.length + i;
		
				if (tab.hasClass('current')) {
					zIndex = tabs.length + 40;
				}
		
				tab.css({
					zIndex: zIndex
				});

				return tab.data({
					zIndex: zIndex
				});
			});
		},
		setupEvents: function() {
			var self = this;

			return this.shell.find('.tab').each(function() {
				var tab;
				
				tab = $(this);

				tab.unbind('click').click(function() {
					return self.setCurrent(tab);
				});

				return tab.find('.close').unbind('click').click(function() {
					tab.trigger('close')
				});
			});
		},
		add: function(newTabData) {
			var tab, tabData;

			tab = $(template);

			this.shell.find('.tabs').append(tab);
			
			tabData = $.extend(true, {}, defaultNewTabData, newTabData);

			this.updateTab(tab, tabData);
			this.setCurrent(tab);
			this.setupSortable();

			// @todo this doesn't work
			setTimeout(function(){
				tab.data('width', tab.width());
			}, 0);

			return tab;
		},
		setCurrent: function(tab) {
			this.shell.find('.current').removeClass('current');

			tab.addClass('current');
			tab.trigger('activate');
			
			return this.render();
		},
		closeTab: function(tab) {
			if (tab.hasClass('current') && tab.prev().length) {
				this.setCurrent(tab.prev());
			} else if (tab.hasClass('current') && tab.next().length) {
				this.setCurrent(tab.next());
			}

			tab.remove();
			return this.render();
		},
		updateTab: function(tab, tabData) {
			tab.find('.title').html(tabData.title);
			return tab.data().tabData = tabData;
		}
	};

	window.Tabs = Tabs;

	return Tabs;
});