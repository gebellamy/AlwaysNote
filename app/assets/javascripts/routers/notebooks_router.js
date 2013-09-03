AlwaysNote.Routers.Notebooks = Backbone.Router.extend({
	routes: {
		"" : "notebooksIndexView",
		"notebooks/:id" : "notebookShowView",
		"notes/:id" : "noteShowView"
	},
	
	notebooksIndexView: function() {
		var view = new AlwaysNote.Views.NotebooksIndex(AlwaysNote.notebooks);
		console.log(AlwaysNote.notebooks);
		console.log(AlwaysNote.notes);
		$('.notebooks').html(view.render().$el);
	}
})