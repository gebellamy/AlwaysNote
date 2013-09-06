AlwaysNote.Views.Navbar = Backbone.View.extend({
	template: JST['navbar/show'],
	
	initialize: function() {
		this.user = AlwaysNote.user;
	},
	
	events: {
		"click .new_note_button" : "newNote"
	},
	
	newNote: function() {
		userId = AlwaysNote.user.user.id;
		notebookId = AlwaysNote.currentNotebook.id;
		var newNote = new AlwaysNote.Models.Note();
		newNote.set({ 'owner_id' : userId, 'notebook_id' : notebookId });
		newNote.save(null, {
			success: function() {
				AlwaysNote.currentNote = newNote;
				AlwaysNote.notes.add(newNote);
				$('.notebooks').hide();
				var notebook = AlwaysNote.currentNotebook;
				var sidebarView = new AlwaysNote.Views.NotesSidebar(notebook);
				$('.notes_sidebar').html(sidebarView.render().$el).show();
				var view = new AlwaysNote.Views.NoteShow();
				AlwaysNote.currentView = view;
				$('.note').html(view.render().$el);
				$('.note').show();
				AlwaysNote.highlightedNote = $('tr#note' + newNote.id);
				AlwaysNote.highlightedNote.addClass("highlighted_note");
			},
			error: function(resp) {
				console.log(resp);
			}
		});
	},
	
	render: function() {
		var content = this.template({ user: this.user.user });
		this.$el.html(content);
		return this;
	}
})