AlwaysNote.Collections.Notes = Backbone.Collection.extend({
	Model: AlwaysNote.Models.Note,
	url: '/notes'
})