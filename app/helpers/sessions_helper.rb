module SessionsHelper
  
  def generate_token!(user)
    user.session_token = SecureRandom.urlsafe_base64(32)
    user.save
    user.session_token
  end
  
  def login_user!(user)
    session[:session_token] = generate_token!(user)
  end
  
  def logout
    session[:session_token] = SecureRandom.urlsafe_base64(30)
    @current_user = nil
  end
  
  def current_user
    @current_user ||= User.find_by_session_token(session[:session_token])
  end
  
  def logged_in?
    !!current_user
  end
  
  def authenticated?
    current_user.authenticated
  end
  
end
