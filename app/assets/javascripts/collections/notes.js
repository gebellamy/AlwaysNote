AlwaysNote.Collections.Notes = Backbone.Collection.extend({
	Model: AlwaysNote.Models.Note,
	url: '/notes',
  
  comparator: function(note) {
		var time = new Date(note.escape('updated_at'));
		time = Date.parse(time) * -1
		return time;
  }
})