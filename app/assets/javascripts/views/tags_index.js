AlwaysNote.Views.TagsIndex = Backbone.View.extend({
	template: JST['tags/index'],
	
	events: {
		"click .tag_text" : "highlightTag",
		"keyup form.tag_search" : "search",
		"click .show_notes_button" : "showNotes",
		"click .delete" : "deleteTag",
		"submit form.tag_search" : "doNothing"
	},
	
	initialize: function(tags) {
		this.tags = tags.sort();
	},
	
	doNothing: function(event) {
		event.preventDefault();
	},
	
	deleteTag: function() {
		var that = this;
		var tagId = parseInt(this.highlightedTag.attr("data-id"));
		var tag = this.tags.get(tagId);
		this.tags.remove(tag);
		tag.destroy({
			success: function() {
				console.log("Success!");
				that.render();
			},
			error: function(resp) {
				console.log(resp);
			}
		});
	},
	
	showNotes: function() {
		var tag_id = parseInt(this.highlightedTag.attr("data-id"));
		var tag = this.tags.get(tag_id);
		var notebook = new AlwaysNote.Models.Notebook();
		notebook.set({
			'title': "All Notes", 
			'notes': tag.get("notes")
		});
		var sidebarView = new AlwaysNote.Views.NotesSidebar(notebook);
		$('.notes_sidebar').html(sidebarView.render().$el).show();
		$('.tags').hide();
		if(notebook.get("notes").length > 0) {
				AlwaysNote.currentNote = 
					AlwaysNote.notes.get(notebook.get("notes")[0].id);
		} else {
			AlwaysNote.currentNote = null;
		}
		if(AlwaysNote.currentNote) {
			AlwaysNote.highlightedNote = $('tr#note'+AlwaysNote.currentNote.id);
			AlwaysNote.highlightedNote.addClass("highlighted_note");
		}
		var view = new AlwaysNote.Views.NoteShow();
		AlwaysNote.currentView = view;
		$('.note').html(view.render().$el);
		$('.note').show();
		$('.markup_bar').hide();
		$('#notes').addClass("selected_sidebar");
		$('#tags').removeClass("selected_sidebar");
		$('#notebooks').removeClass("selected_sidebar");
	},
	
	highlightTag: function(event) {
		if(this.highlightedTag) {
			this.highlightedTag.removeClass("highlighted_tag");
			$('.show_notes_button').remove();
		}
		this.highlightedTag = $(event.currentTarget);
		this.highlightedTag.addClass("highlighted_tag");
		var id = parseInt($(event.currentTarget).attr("data-id"));
		$('.delete_area').html(JST['notebooks/delete']());
		$('.tags_bar').append(JST['tags/show_button']({
			tag: this.tags.get(id)
		}));
	},
	
	search: function(event) {
		var that = this;
		if(!AlwaysNote.searchingTags || event.which == 8)
		{
			AlwaysNote.searchingTags = this.tags.clone();
		}
		if(event.which !== 16 && event.which !== 13 && event.which !== 27) {
			var titleSearch = $(event.currentTarget).serializeJSON()["title"].toLowerCase();
			var searching = AlwaysNote.searchingTags.clone();
			searching.each(function(tag) {
				var title = tag.escape("title").toLowerCase();
				if(title.indexOf(titleSearch) == -1) {
					AlwaysNote.searchingTags.remove(tags);
					$('.tag_show#tag' + tag.id).hide();
				} else {
					$('.tag_show#tag' + tag.id).show();
				}
			});
		} else if(event.which === 27) {
			this.render();
		}
	},
	
	render: function() {
		var content = this.template({ tags: this.tags });
		this.$el.html(content);
		this.$el.show();
		return this;
	}
});