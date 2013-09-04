AlwaysNote.Views.NotebooksIndex = Backbone.View.extend({
	template : JST['notebooks/index'],
	
	initialize: function(notebooks) {
		this.notebooks = notebooks;
	},
	
	events: {
		"click .notebook_show" : "highlightNotebook",
		"dblclick .notebook_title" : "editTitle",
		"submit .notebook_title_form" : "saveTitle",
		"click button.new_notebook" : "newNotebook",
		"submit form.create_new_notebook" : "createNotebook",
		"keyup form.search" : "search",
		"submit form.search" : "doNothing"
	},
	
	doNothing: function(event) {
		event.preventDefault();
	},
	
	search: function(event) {
		var that = this;
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
			this.notebooks = AlwaysNote.searchingNotebooks;
			this.render();
		} else if(event.which === 27) {
			AlwaysNote.titleSearch = null;
			this.notebooks = AlwaysNote.notebooks;
			this.render();
		}
	},
	
	render: function() {
		var content = this.template({ 
			notebooks: this.notebooks
		});
		this.$el.html(content);
		return this;
	},
	
	highlightNotebook: function(event) {
		if(AlwaysNote.highlightedNotebook) {
			$(AlwaysNote.highlightedNotebook).removeClass("highlighted_notebook");
		}
		var notebookId = parseInt($($(event.currentTarget)).attr("data-id"));
		AlwaysNote.currentNotebook = AlwaysNote.notebooks.get(notebookId);
		AlwaysNote.highlightedNotebook = $(event.currentTarget);
		$(AlwaysNote.highlightedNotebook).addClass("highlighted_notebook");
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
		var newNotebook = new AlwaysNote.Models.Notebook();
		$(this.$el).append(JST['notebooks/new']({ notebook: newNotebook }));
	},
	
	createNotebook: function(event) {
		var that = this;
		event.preventDefault();
		var formData = $(event.currentTarget).serializeJSON();
		var newNotebook = new AlwaysNote.Models.Notebook(formData);
		newNotebook.save(null, {
			success: function(resp) {
				AlwaysNote.notebooks.add(newNotebook);
				that.notebooks = AlwaysNote.notebooks;
				that.render();
			},
			failure: function(resp, error) {
				console.log(error);
			}
		});
	}
});