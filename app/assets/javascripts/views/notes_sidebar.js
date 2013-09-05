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
		if(AlwaysNote.highlightedNote) {
			AlwaysNote.highlightedNote.removeClass("highlighted_note");
		}
		$(event.currentTarget).addClass("highlighted_note");
		AlwaysNote.highlightedNote = $(event.currentTarget);
		var id = parseInt($(event.currentTarget).attr("data-id"));
		AlwaysNote.currentNote = this.notes.get(id);
		//Make individual note view stuff happen here
		var show = new AlwaysNote.Views.NoteShow();
		$('.note').html(show.render().$el);
		$('.note').show()
	}
})