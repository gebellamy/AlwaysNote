class NotebooksController < ApplicationController

  def index
    if logged_in?
      notebook_ids = Contribution.where("user_id = ?", current_user.id)
      p notebook_ids
      @notebooks = Notebook.where("id IN (?)", notebook_ids)
      render :index, :handlers => [:rabl]
    else
      redirect_to new_session_url
    end
  end
  
  def create
    @notebook = Notebook.new(params[:notebook])
    if @notebook.save
      render :json => @notebook
    else
      render :json => @notebook.errors.full_messages, :status => 422
    end
  end
  
  def destroy
    
  end
  
  def update
    @notebook = Notebook.find_by_id(params[:id])
    @notebook.title = params[:title]
    if @notebook.save
      render :json => @notebook
    else
      render :json => @notebook.errors.full_messages, :status => 422
    end
  end
  
  def show
    
  end
  
end
