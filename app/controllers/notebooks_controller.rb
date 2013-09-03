class NotebooksController < ApplicationController

  def index
    if logged_in?
      notebook_ids = Contribution.where("user_id = ?", current_user.id)
      @notebooks = Notebook.where("id = ?", notebook_ids)
      render :index, :handlers => [:rabl]
    else
      redirect_to new_session_url
    end
  end
  
  def create
    
  end
  
  def destroy
    
  end
  
  def update
    
  end
  
  def show
    
  end
  
end
