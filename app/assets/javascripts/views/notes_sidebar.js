AlwaysNote.Views.NotesSidebar = Backbone.View.extend({
	template: JST['notes/sidebar'],
	
	initialize: function(notebook) {
		console.log("Initialize"); 
		this.notebook = notebook;
		this.notes = this.notebook.get("notes");
	},
	
	events: {
		
	},
	
	render: function() {
		console.log(this.notes)
		var content = this.template({ 
			notebook: this.notebook,
			notes: this.notes 
		});
		this.$el.html(content);
		return this;
	}
})