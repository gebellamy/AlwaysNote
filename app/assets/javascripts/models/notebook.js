AlwaysNote.Models.Notebook = Backbone.Model.extend({
	urlRoot: "/notebooks",
	
	parse: function(data) {
		data.notes = new AlwaysNote.Collections.Notes(data.notes);
		return data;
	}
})