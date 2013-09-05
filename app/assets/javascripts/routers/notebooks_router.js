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
		$('.notes_sidebar').hide();
		$('.notes').hide();
		var view = new AlwaysNote.Views.NotebooksIndex(AlwaysNote.notebooks);
		AlwaysNote.currentView = view;
		$('.notebooks').html(view.render().$el).show();
	},
	
	notebookShowView: function(id) {
		$('.notebooks').hide();;
		var notebook = AlwaysNote.notebooks.get(id);
		var sidebarView = new AlwaysNote.Views.NotesSidebar(notebook);
		$('.notes_sidebar').html(sidebarView.render().$el).show();;
		//var view = new AlwaysNote.Views.NotebookShow();
		//AlwaysNote.currentView = view;
		//$('.notes').html(view.render().$el);
	}
	
})