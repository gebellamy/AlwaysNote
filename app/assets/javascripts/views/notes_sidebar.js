AlwaysNote.Views.NotesSidebar = Backbone.View.extend({
	template: JST['notes/sidebar'],
	
	initialize: function(notebook) {
		if(notebook) {
			this.notebook = notebook;
			this.notes = new AlwaysNote.Collections.Notes(this.notebook.get("notes"));
			AlwaysNote.currentNotebook = this.notebook;
		} else {
			this.notes = AlwaysNote.notes;
			this.notebook = new AlwaysNote.Models.Notebook({'title' : "All Notes"});
		}
	},
	
	events: {
		"click .notes_list tr" : "selectNote",
		"click .update_sort" : "sortByUpdated",
		"click .title_sort" : "sortByTitle",
		"click .all_notes" : "showAllNotes"
	},
	
	render: function() {
		var content = this.template({ 
			notebook: this.notebook,
			notes: this.notes 
		});
		this.$el.html(content);
		return this;
	},
	
	showAllNotes: function(event) {
		if(AlwaysNote.noteSidebarView) {
			AlwaysNote.noteSidebarView.remove();
		}
		var sidebarView = new AlwaysNote.Views.NotesSidebar();
		AlwaysNote.noteSidebarView = sidebarView;
		$('.notes_sidebar').html(sidebarView.render().$el).show();
	},
	
	sortByUpdated: function(event) {
		this.notes.comparator = function(note) {
			var time = new Date(note.escape('updated_at'));
			time = Date.parse(time) * -1
			return time;
		}
		this.notes.sort();
		this.render();
		$('.update_sort').addClass("current_sort");
		$('.title_sort').removeClass("current_sort");
	},
	
	sortByTitle: function(event) {
		this.notes.comparator = function(note) {
			return note.escape('title');
		}
		this.notes.sort();
		this.render();
		$('.update_sort').removeClass("current_sort");
		$('.title_sort').addClass("current_sort");
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