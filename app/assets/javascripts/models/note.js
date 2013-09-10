AlwaysNote.Models.Note = Backbone.Model.extend({
	urlRoot: "/notes",
	
	parse: function(data) {
		data.tags = new AlwaysNote.Collections.Tags(data.tags);
		console.log(data);
		return data;
	}
})