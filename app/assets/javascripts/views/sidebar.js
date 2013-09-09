AlwaysNote.Views.Sidebar = Backbone.View.extend({
	template: JST['sidebar/show'],
	
	initialize: function() {
		AlwaysNote.notes.comparator = function(note) {
			var time = new Date(note.escape('updated_at'));
			time = Date.parse(time) * -1
			return time;
		}
		AlwaysNote.notes.sort();
		this.recentNotes = AlwaysNote.notes.slice(0, 5);
	},
	
	events: {
		"click #notes" : "showNotes",
		"click #notebooks" : "showNotebooks",
		"click #tags" : "showTags",
		"click .recent_note" : "navigateToNote"
	},
	
	navigateToNote: function(event) {
		var id = parseInt($(event.currentTarget).attr("data-id"));
		AlwaysNote.currentNote = AlwaysNote.notes.get(id);
		var notebookId = AlwaysNote.currentNote.get("notebook_id");
		if(AlwaysNote.currentNotebook.id == notebookId) {
			var show = new AlwaysNote.Views.NoteShow();
			$('.note').html(show.render().$el);
			$('.note').show()
			$('.markup_bar').hide();
		} else {
		Backbone.history.navigate("notebooks/" + notebookId,
			{ trigger: true });
		}
	},
	
	showTags: function() {
		$('#notes').removeClass("selected_sidebar");
		$('#tags').addClass("selected_sidebar");
		$('#notebooks').removeClass("selected_sidebar");
		Backbone.history.navigate("tags", { trigger: true });
	},
	
	showNotes: function() {
		$('#notes').addClass("selected_sidebar");
		$('#tags').removeClass("selected_sidebar");
		$('#notebooks').removeClass("selected_sidebar");
		Backbone.history.navigate("notebooks/" + AlwaysNote.currentNotebook.id, 
			{ trigger: true })
	},
	
	showNotebooks: function() {
		$('#notes').removeClass("selected_sidebar");
		$('#tags').removeClass("selected_sidebar");
		$('#notebooks').addClass("selected_sidebar");
		Backbone.history.navigate("", {trigger: true});
	},
	
	render: function() {
		var content = this.template({ recentNotes : this.recentNotes });
		this.$el.html(content);
		return this;
	}
})