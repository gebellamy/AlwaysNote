class NotesController < ApplicationController

  def create
    @note = Note.new(params[:note])
    if @note.save
      render :show, :handlers => [:rabl]
    else
      render :json => @note.errors.full_messages, :status => 422
    end
  end
  
  def destroy
    @note = Note.find_by_id(params[:id])
    if @note.destroy
      render :json => true
    else
      render :json => @note.errors.full_messages, :status => 422
    end
  end
  
  def update
    @note = Note.find_by_id(params[:id])
    @note.title = params[:title]
    @note.body = params[:body]
    @note.notebook_id = params[:notebook_id]
    if @note.save
      render :show, :handlers => [:rabl]
    else
      render :json => @note.errors.full_messages, :status => 422
    end
  end
  
  def show
    @note = Note.find_by_id(params[:id])
    render :show, :handlers => [:rabl]
  end
  
  def index
    notebook_ids = Contribution.where("user_id = ?", current_user.id)
    @notes = Note.where("notebook_id IN (?)", notebook_ids)
    render :index, :handlers => [:rabl]
  end
end
