window.AlwaysNote = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    console.log("Alerts are annoying");
	AlwaysNote.notebooks = new AlwaysNote.Collections.Notebooks();
	AlwaysNote.notes = new AlwaysNote.Collections.Notes();
	AlwaysNote.user = JSON.parse($("#bootstrapped_user").html());
	
	AlwaysNote.notebooks.fetch({
		success: function() {
			AlwaysNote.notes.fetch({
				success: function() {
					AlwaysNote.router = new AlwaysNote.Routers.Notebooks();
	
					Backbone.history.start();
				}
			});
		}
	});
  }
};

$(document).ready(function(){
  AlwaysNote.initialize();
});
