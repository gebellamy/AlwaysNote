AlwaysNote.Views.NotebooksIndex = Backbone.View.extend({
	template : JST['notebooks/index'],
	
	initialize: function(notebooks) {
		this.notebooks = notebooks;
	},
	
	events: {
		"click .notebook_show" : "highlightNotebook",
		"dblclick .notebook_title" : "editTitle",
		"submit .notebook_title_form" : "saveTitle",
		"click button.new_notebook" : "newNotebook"
	},
	
	render: function() {
		var content = this.template({ 
			notebooks: this.notebooks
		});
		this.$el.html(content);
		return this;
	},
	
	highlightNotebook: function(event) {
		if(AlwaysNote.currentNotebook) {
			$(AlwaysNote.currentNotebook).removeClass("highlighted_notebook");
		}
		AlwaysNote.currentNotebook = $(event.currentTarget);
		AlwaysNote.currentNotebook.addClass("highlighted_notebook");
	},
	
	editTitle: function(event) {
		var notebookId = parseInt($(event.currentTarget).attr("data-id"));
		var titleForm = JST['notebooks/title']({ 
			notebook: AlwaysNote.notebooks.get({ 'id' : notebookId })
		});
		$(".notebook_title#notebook" + notebookId).html(titleForm);
	},
	
	saveTitle: function(event) {
		event.preventDefault();
		var formData = $(event.currentTarget).serializeJSON();
		var notebook = AlwaysNote.notebooks.get({ 'id' : formData["notebook"]["id"] })
		notebook.set({ 'title' : formData["notebook"]["title"] });
		notebook.save();
		$(".notebook_title#notebook" + notebook.id).html(notebook.escape("title"));
	},
	
	newNotebook: function(event) {
		console.log("Button pressed!");
	}
});