AlwaysNote.Views.NotebooksIndex = Backbone.View.extend({
	template : JST['notebooks/index'],
	
	initialize: function(notebooks) {
		this.notebooks = notebooks;
	},
	
	render: function() {
		var content = this.template({ 
			notebooks: this.notebooks
		});
		this.$el.html(content);
		return this;
	}
});