class UsersController < ApplicationController
  
  def create
    @user = User.new(params[:user])
    @user.set_auth_token!
    @user.set_base_email!
    if @user.save
      login_user!(@user)
      Notifier.signup_email(@user).deliver
      redirect_to @user
    else
      render :new
    end
  end
  
  def new
    @user = User.new
    render :new
  end
  
  def authenticate
    @user = User.find_by_auth_token(params[:auth_token])
    if @user
      @user.set_auth_token!
      @user.authenticated = true
      @user.save
      login_user!(@user)
      redirect_to root_url
    else
      redirect_to new_user_url
      #change this to something else later?
    end
  end
  
  def edit
    @user = User.find_by_id(params[:id])
    render :new_password
  end
  
  def update
    @user = User.find_by_id(params[:id])
    if @user && @user.verify_password(params[:user][:old_password])
      @user.password = params[:user][:new_password]
      @user.save
      redirect_to root_url
    else
      redirect_to new_session_url
    end
  end
  
  def forgot_password
    render :forgot_password
  end
  
  def send_password
    @user = User.find_by_username(params[:user][:username])
    if @user
      Notifier.forgot_password_email(@user).deliver
    end
    redirect_to root_url
  end
  
end
