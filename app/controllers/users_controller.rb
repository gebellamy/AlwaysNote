class UsersController < ApplicationController
  
  def create
    @user = User.new(params[:user])
    @user.set_auth_token!
    @user.set_base_email!
    if @user.save
      login_user!(@user)
      #send out auth email here
      redirect_to @user
    else
      render :new
    end
  end
  
  def new
    @user = User.new
    render :new
  end
  
end
