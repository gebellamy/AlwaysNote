class SessionsController < ApplicationController
  
  def create
    @user = User.find_by_username(params[:user][:username])
    if @user && @user.verify_password(params[:user][:password])
      login_user!(@user)
      redirect_to root_url
    else
      render :new
    end
  end
  
  def new
    render :new
  end
  
  def destroy
    logout
    render :new
  end
  
end
