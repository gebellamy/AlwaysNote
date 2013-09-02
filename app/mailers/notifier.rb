class Notifier < ActionMailer::Base
  default from: "accounts@alwaysnote.com"
  
  def signup_email(user)
    @user = user
    @url = "http://localhost:3000/users/authenticate?auth_token=" + @user.auth_token
    mail( :to => @user.email,
          :subject => 'Thanks for signing up!' )
  end
  
  def forgot_password_email(user)
    @user = user
    @random_password = SecureRandom.urlsafe_base64(10)
    @user.password = @random_password
    @user.save
    @url = "http://localhost:3000/users/" + @user.id + "/edit"
    mail( :to => @user.email,
          :subject => 'AlwaysNote Password Reset' )
  end
end
