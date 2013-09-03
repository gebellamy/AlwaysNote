class NotesController < ApplicationController

  def create
    @note = Note.new(params[:note])
    if @note.save
      render @note
    else
      render :json => @note.errors.full_messages, :status => 422
    end
  end
  
  def destroy
    @note = Note.find_by_id(params[:id])
    if @note.destroy
      render :json => @note
    else
      render :json => @note.errors.full_messages, :status => 422
    end
  end
  
  def update
    
  end
  
  def show
    render :show, :handlers => [:rabl]
  end
  
  def index
    @notes = Note.where("owner_id = ?", current_user.id)
    render :index, :handlers => [:rabl]
  end
end
