AlwaysNote.Views.NoteShow = Backbone.View.extend({
	template: JST['notes/show'],
	
	initialize: function() {
		this.note = AlwaysNote.currentNote;
		this.notebook = AlwaysNote.notebooks.get(parseInt(this.note.get("notebook_id")));
	},
	
	events: {
		"focusin .note_body" : "showMarkup",
		"focusout .note_body" : "hideMarkup",
		"submit" : "doNothing",
		"click .editable" : "editableClick",
		"click .note_body" : "editBody",
		"click .note_title" : "editTitle",
	},
	
	render: function() {
		var content = this.template({ 
			notebook: this.notebook,
			note: this.note 
		});
		this.$el.html(content);
		return this;
	},
	
	editableClick: etch.editableInit,
	
	editTitle: function() {	
		var autosave = _.debounce(this.saveNote, 500);
		$('.title').keypress(autosave);
	},
	
	saveNote: function() {
		AlwaysNote.currentNote.set({ 
			'body' : $('.note_body').html(),
			'title' : $('.title').serializeJSON()["note"]["title"]
		});
		AlwaysNote.currentNote.save(null, {
			success: function() {
				console.log("Success!");
			},
			error: function() {
				console.log("Something went horribly wrong.");
			}
		});
	},
	
	editBody: function() {
		var autosave = _.debounce(this.saveNote, 500);
		$('.note_body').keypress(autosave);
	},
	
	doNothing: function(event) {
		event.preventDefault();
	},
	
	hideMarkup: function() {
		$('.status_bar').show();
		$('.markup_bar').hide();
	},
	
	showMarkup: function() {
		$('.status_bar').hide();
		$('.markup_bar').show();
	}
})