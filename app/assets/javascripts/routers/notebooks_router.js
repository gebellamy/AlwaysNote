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
		var navbarView = new AlwaysNote.Views.Navbar();
		$('.navbar').html(navbarView.render().$el);	
	},
	
	notebooksIndexView: function() {
		if(AlwaysNote.currentView) {
			AlwaysNote.currentView.destroy();
		}
		var view = new AlwaysNote.Views.NotebooksIndex(AlwaysNote.notebooks);
		AlwaysNote.currentView = view;
		$('.notebooks').html(view.render().$el);
	},
	
	notebookShowView: function(id) {
		var notebook = AlwaysNote.notebooks.get(id);
		var sidebarView = new AlwaysNote.Views.NotesSidebar(notebook);
		$('.notes_sidebar').html(sidebarView.render().$el);
		//var view = new AlwaysNote.Views.NotebookShow();
		//AlwaysNote.currentView = view;
		//$('.notes').html(view.render().$el);
	}
	
})