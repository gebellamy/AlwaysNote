AlwaysNote.Collections.Tags = Backbone.Collection.extend({
	url: "/tags",
	model: AlwaysNote.Models.Tag,
  
  comparator: function(tag) {
    return tag.escape("title");
  }
});