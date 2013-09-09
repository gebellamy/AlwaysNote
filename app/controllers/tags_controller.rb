class TagsController < ApplicationController
  def create
    @tag = Tag.find_by_title(params[:title])
    unless @tag
      @tag = Tag.create(:title => params[:title])
    end
    if @tag.save
      @note_tagging = NoteTagging.create({
        :tag_id => @tag.id,
        :note_id => params[:note_id]
      });
      render :show, :handlers => :rabl
    else
      render @tag.errors.full_messages, :status => 422
    end
  end
  
  def index
    # Get all tags that belong to a notebook that the user can see
    notebook_ids = Contribution.where("user_id = ?", current_user.id)
    note_ids = Note.where("notebook_id IN (?)", notebook_ids)
    tag_ids = NoteTagging.where("note_id IN (?)", note_ids)
    @tags = Tag.where("id IN (?)", tag_ids)
    render :index, :handlers => :rabl
  end
  
  def destroy
    
  end
end
