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
  
  def destroy
    
  end
end
