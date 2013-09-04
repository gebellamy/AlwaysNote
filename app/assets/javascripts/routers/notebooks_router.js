AlwaysNote.Routers.Notebooks = Backbone.Router.extend({
	routes: {
		"" : "notebooksIndexView",
		"notebooks/new" : "newNotebookView",
		"notebooks/:id" : "notebookShowView",
		"notes/:id" : "noteShowView"
	},
	
	initialize: function() {
		var sidebarView = new AlwaysNote.Views.Sidebar(AlwaysNote.notes);
		$('.sidebar').html(sidebarView.render().$el)
	},
	
	notebooksIndexView: function() {
		if(AlwaysNote.currentView) {
			AlwaysNote.currentView.destroy();
		}
		var view = new AlwaysNote.Views.NotebooksIndex(AlwaysNote.notebooks);
		AlwaysNote.currentView = view;
		var barView = new AlwaysNote.Views.NotebooksBar();
		$('.notebooks_bar').html(barView.render().$el);
		$('.notebooks').html(view.render().$el);
	},
	
	
})