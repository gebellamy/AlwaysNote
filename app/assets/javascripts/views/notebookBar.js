AlwaysNote.Views.NotebooksBar = Backbone.View.extend({
	template: JST['notebooks/bar'],
	
	events: {
		"keyup form.search" : "search",
		"submit form.search" : "doNothing"
	},
	
	render: function() {
		var content = this.template();
		this.$el.html(content);
		return this;
	},
	
	doNothing: function(event) {
		event.preventDefault();
	},
	
	search: function(event) {
		if(!AlwaysNote.searchingNotebooks)
		{
			AlwaysNote.searchingNotebooks = AlwaysNote.notebooks.clone();
		}
		if(event.which !== 16 && event.which !== 13 && event.which !== 27) {
			AlwaysNote.titleSearch = $(event.currentTarget).serializeJSON()["title"];
			var searching = AlwaysNote.searchingNotebooks.clone();
			searching.each(function(notebook) {
				var title = notebook.escape("title").toLowerCase();
				if(title.indexOf(AlwaysNote.titleSearch) == -1) {
					AlwaysNote.searchingNotebooks.remove(notebook);
				}
			});
			AlwaysNote.currentView.notebooks = AlwaysNote.searchingNotebooks;
			AlwaysNote.currentView.render();
		} else if(event.which === 27) {
			AlwaysNote.titleSearch = null;
			AlwaysNote.currentView.notebooks = AlwaysNote.notebooks;
			AlwaysNote.currentView.render();
		}
	}
})