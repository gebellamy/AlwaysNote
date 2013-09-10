AlwaysNote.Routers.Notebooks = Backbone.Router.extend({
	routes: {
		"" : "notebooksIndexView",
		"notebooks/:id" : "notebookShowView",
		"tags" : "tagsIndexView"
	},
	
	initialize: function() {
		var sidebarView = new AlwaysNote.Views.Sidebar(AlwaysNote.notes);
		$('.sidebar').html(sidebarView.render().$el)
		var navbarView = new AlwaysNote.Views.Navbar();
		$('.navbar').html(navbarView.render().$el);	
	},
	
	tagsIndexView: function() {
		$('.notes_sidebar').hide();
		$('.notebooks').hide();
		$('.note').hide();
		var tags = new AlwaysNote.Collections.Tags();
		tags.fetch({
			success: function() {
				var view = new AlwaysNote.Views.TagsIndex(tags);
				$('.tags').html(view.render().$el);
				$('.tags').show();
			}
		});
	},
	
	notebooksIndexView: function() {
		$('.notes_sidebar').hide();
		$('.note').hide();
		var view = new AlwaysNote.Views.NotebooksIndex(AlwaysNote.notebooks);
		AlwaysNote.currentView = view;
		$('.notebooks').html(view.render().$el).show();
	},
	
	notebookShowView: function(id) {
		$('.notebooks').hide();
		var notebook = AlwaysNote.notebooks.get(id);
		AlwaysNote.currentNotebook = notebook; 
		if(notebook.get("notes").length > 0) {
			if(!AlwaysNote.currentNote || 
				AlwaysNote.currentNote.get("notebook_id") != id) {
				AlwaysNote.currentNote = 
					AlwaysNote.notes.get(notebook.get("notes")[0].id);
			}
		} else {
			AlwaysNote.currentNote = null;
		}
		var sidebarView = new AlwaysNote.Views.NotesSidebar(notebook);
		$('.notes_sidebar').html(sidebarView.render().$el).show();
		if(AlwaysNote.currentNote) {
			AlwaysNote.highlightedNote = $('tr#note'+AlwaysNote.currentNote.id);
			AlwaysNote.highlightedNote.addClass("highlighted_note");
		}
		var view = new AlwaysNote.Views.NoteShow();
		AlwaysNote.currentView = view;
		$('.note').html(view.render().$el);
		$('.note').show();
		$('.markup_bar').hide();
	}
	
})