AlwaysNote.Views.Sidebar = Backbone.View.extend({
	template: JST['sidebar/show'],
	
	initialize: function() {
		this.recentNotes = [AlwaysNote.notes.first()];
		//Change this to be an array of the five most-recently updated notes
		//Add listeners
	},
	
	events: {
		"click #notes" : "showNotes",
		"click #notebooks" : "showNotebooks"
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