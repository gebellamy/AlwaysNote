AlwaysNote.Views.NoteShow = Backbone.View.extend({
	template: JST['notes/show'],
	
	initialize: function() {
		this.note = AlwaysNote.currentNote;
		this.notebook = AlwaysNote.currentNotebook;
		this.savingBody = false;
		this.savingTitle = false;
	},
	
	events: {
		"focusin .note_body" : "showMarkup",
		//"focusout .note_body" : "hideMarkup",
		"submit" : "doNothing",
		"click .editable" : "editableClick",
		"click .note_body" : "editBody",
		"click .note_title" : "editTitle",
		"click .choose_notebook" : "chooseNotebook",
		"change form.changeMenu" : "changeNotebook",
		"click .add_tags_area" : "newTag",
		"submit form.new_tag" : "addTag",
		"keyup form.new_tag" : "closeForm",
		"click .delete" : "deleteNote",
		"click [type='checkbox']" : "checkBox"
	},
	
	render: function() {
		var content = this.template({ 
			notebook: this.notebook,
			note: this.note 
		});
		this.$el.html(content);
		return this;
	},
	
	checkBox: function(event) {
		console.log("Box checked/unchecked!");
		console.log(event.target);
		if(event.currentTarget == "<input type='checkbox'>") {
			console.log("Equal");
		}
	},
	
	deleteNote: function() {
		var that = this;
		var currentNoteId = AlwaysNote.currentNote.id;
		AlwaysNote.currentNote.destroy({
			success: function() {
				var notes = that.notebook.get("notes");
				for(var i = 0, len = notes.length; i < len; i++) {
					if(notes[i].id == currentNoteId){
						notes.splice(i, 1);
						break;
					}
				}
				if(that.notebook.get("notes").length > 0) {
					var id = that.notebook.get("notes")[0].id;
					AlwaysNote.currentNote = AlwaysNote.notes.get(id);
					that.note = AlwaysNote.currentNote;
				} else {
					that.note = null;
				}
				that.render();
				$('.markup_bar').hide();
				var sidebar = new AlwaysNote.Views.NotesSidebar(that.notebook);
				$('.notes_sidebar').html(sidebar.render().$el).show();
				AlwaysNote.highlightedNote = $('tr#note'+AlwaysNote.currentNote.id);
				AlwaysNote.highlightedNote.addClass("highlighted_note");
			},
			error: function(resp) {
				console.log(resp);
			}
		});
	},
	
	closeForm: function(event) {
		if(event.which == 27) {
			this.render();
			$('.markup_bar').hide();
		}
	},
	
	addTag: function(event) {
		var that = this;
		event.preventDefault();
		formData = $(event.currentTarget).serializeJSON();
		var tag = new AlwaysNote.Models.Tag();
		tag.save(formData, {
			success: function(resp) {
        var found = false;
        var noteTags = that.note.get("tags");
        for(var i = 0, len = noteTags.length; i < len; i++) {
          if(noteTags[i].title == formData.title) {
            found = true;
            break;
          }
        }
        if(!found) {
          that.note.get("tags").push(formData); 
        }
				that.render();
				$('.markup_bar').hide();
			},
			error: function(model, resp) {
				console.log(model);
			}
		});
	},
	
	newTag: function(event) {
		$('.add_tags_area').hide();
		$('.new_tag_area').html(JST['tags/new']({ note: this.note }));
	},
	
	changeNotebook: function(event) {
		event.preventDefault();
		var that = this;
		var id = parseInt($(event.currentTarget).serializeJSON().id);
		AlwaysNote.currentNote.save({ 'notebook_id': id }, {
			success: function() {
				var notebook = AlwaysNote.notebooks.get(id);
				var notes = that.notebook.get("notes");
				for(var i = 0, len = notes.length; i < len; i++) {
					if(notes[i].id == AlwaysNote.currentNote.id){
						notes.splice(i, 1);
						break;
					}
				}
				notebook.get("notes").push(AlwaysNote.currentNote);
				Backbone.history.navigate("notebooks/" + id, { trigger: true });
			},
			error: function(resp) {
				console.log(resp);
			}
		});
	},
	
	chooseNotebook: function() {
		if(this.menu) {
			if(this.menuShown) {
				this.menu.hide();
				this.menuShown = false;
			} else {
				this.menu.show();
				this.menuShown = true;
			}
		} else {
			var menu = JST['notes/changeMenu']({
				notebooks: AlwaysNote.notebooks
			});
			this.$el.append(menu);
			this.menu = $('.changeMenu');
			this.menuShown = true;
		}
	},
	
	editableClick: etch.editableInit,
	
	editTitle: function() {	
		if(!this.savingTitle) {
			this.savingTitle = true;
			var autosave = _.debounce(this.saveNote, 500);
			$('.title').keypress(autosave);
		}
	},
	
	saveNote: function() {
		var note = AlwaysNote.notes.get(parseInt(AlwaysNote.currentNote.id));
		note.save({ 
			'body' : $('.note_body').html(),
			'title' : $('.title').serializeJSON()["note"]["title"]},
			{
			success: function(model, resp) {
				var id = note.id;
				var notes = AlwaysNote.currentNotebook.get("notes");
				for(var i = 0, len = notes.length; i < len; i++) {
					if(notes[i].id == id){
						notes.splice(i, 1);
						break;
					}
				}
				AlwaysNote.currentNotebook.get("notes").push(resp);
				var noteCollection = new AlwaysNote.Collections.Notes(
					AlwaysNote.currentNotebook.get("notes"));
				$('tr#note' + id + ' td#title').html(note.escape('title'));
				var updated = new Date(note.escape("updated_at"));
				var time = updated.toDateString().slice(4) + " " + 
					updated.toTimeString().slice(0,8)
				$('tr#note' + id + ' td#updated').html(time);
			},
			error: function() {
				console.log("Something went horribly wrong.");
			}
		});
	},
	
	editBody: function() {
		if(!this.savingBody) {
			this.savingBody = true;
			var autosave = _.debounce(this.saveNote, 500);
			$('.note_body').keypress(autosave);
		}
	},
	
	doNothing: function(event) {
		event.preventDefault();
	},
	
	hideMarkup: function() {
		$('.status_bar').show();
		$('.markup_bar').hide();
	},
	
	showMarkup: function() {
		$('.status_bar').hide();
		$('.markup_bar').show();
	}
})