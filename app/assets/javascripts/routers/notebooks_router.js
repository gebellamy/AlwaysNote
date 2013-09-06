AlwaysNote.Routers.Notebooks = Backbone.Router.extend({
	routes: {
		"" : "notebooksIndexView",
		"notebooks/:id" : "notebookShowView"
	},
	
	initialize: function() {
		var sidebarView = new AlwaysNote.Views.Sidebar(AlwaysNote.notes);
		$('.sidebar').html(sidebarView.render().$el)
		var navbarView = new AlwaysNote.Views.Navbar();
		$('.navbar').html(navbarView.render().$el);	
	},
	
	notebooksIndexView: function() {
		$('.notes_sidebar').hide();
		$('.note').hide();
		var view = new AlwaysNote.Views.NotebooksIndex(AlwaysNote.notebooks);
		AlwaysNote.currentView = view;
		$('.notebooks').html(view.render().$el).show();
	},
	
	notebookShowView: function(id) {
		$('.notebooks').hide();;
		var notebook = AlwaysNote.notebooks.get(id);
		AlwaysNote.currentNotebook = notebook;
		if(!AlwaysNote.currentNote) {
			AlwaysNote.currentNote = AlwaysNote.notes.get(parseInt(notebook.get("notes")[0].id));
		}
		var sidebarView = new AlwaysNote.Views.NotesSidebar(notebook);
		$('.notes_sidebar').html(sidebarView.render().$el).show();
		var view = new AlwaysNote.Views.NoteShow();
		AlwaysNote.currentView = view;
		$('.note').html(view.render().$el);
		$('.note').show();
		AlwaysNote.highlightedNote = $('tr#note' + AlwaysNote.currentNote.id);
		AlwaysNote.highlightedNote.addClass("highlighted_note");
	}
	
})