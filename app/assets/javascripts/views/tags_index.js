AlwaysNote.Views.TagsIndex = Backbone.View.extend({
	template: JST['tags/index'],
	
	events: {
		"click .tag_text" : "highlightTag"
	},
	
	initialize: function(tags) {
		this.tags = tags;
	},
	
	highlightTag: function(event) {
		if(this.highlightedTag) {
			this.highlightedTag.removeClass("highlighted_tag");
			$('.show_tags_button').remove();
		}
		this.highlightedTag = $(event.currentTarget);
		this.highlightedTag.addClass("highlighted_tag");
		var id = parseInt($(event.currentTarget).attr("data-id"));
		$('.tags_bar').append(JST['tags/show_button']({
			tag: this.tags.get(id)
		}));
	},
	
	render: function() {
		var content = this.template({ tags: this.tags });
		this.$el.html(content);
		return this;
	}
});