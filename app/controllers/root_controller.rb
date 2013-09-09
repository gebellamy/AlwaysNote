class RootController < ApplicationController
  def root
    if !logged_in?
      redirect_to new_session_url
    else
      render :root
    end
  end
end
