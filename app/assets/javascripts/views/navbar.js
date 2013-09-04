AlwaysNote.Views.Navbar = Backbone.View.extend({
	template: JST['navbar/show'],
	
	initialize: function() {
		this.user = AlwaysNote.user;
	},
	
	render: function() {
		var content = this.template({ user: this.user.user });
		this.$el.html(content);
		return this;
	}
})