AlwaysNote.Views.NotesSidebar = Backbone.View.extend({
	template: JST['notes/sidebar'],
	
	initialize: function(notebook) { 
		this.notebook = notebook;
		this.notes = new AlwaysNote.Collections.Notes(this.notebook.get("notes"));
		AlwaysNote.currentNotebook = this.notebook;
	},
	
	events: {
		"click .notes_list tr" : "selectNote"
	},
	
	render: function() {
		var content = this.template({ 
			notebook: this.notebook,
			notes: this.notes 
		});
		this.$el.html(content);
		return this;
	},
	
	selectNote: function(event) {
		$(event.currentTarget).addClass("highlighted_note");
		AlwaysNote.highlightedNote = $(event.currentTarget);
		//Make individual note view stuff happen here
	}
})