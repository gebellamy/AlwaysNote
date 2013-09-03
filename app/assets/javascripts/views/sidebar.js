AlwaysNote.Views.Sidebar = Backbone.View.extend({
	template: JST['sidebar/show'],
	
	initialize: function() {
		this.recentNotes = [AlwaysNote.notes.first()];
		//Change this to be an array of the five most-recently updated notes
		//Add listeners
	},
	
	render: function() {
		var content = this.template({ recentNotes : this.recentNotes });
		this.$el.html(content);
		return this;
	}
})