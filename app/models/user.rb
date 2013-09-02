class User < ActiveRecord::Base
  
  require 'bcrypt'
  
  attr_accessible :username, :password, :email
  attr_reader :password
  
  validates :username, :password_digest, :email, :presence => true
  validates :password, :length => { :minimum => 6 }
  validates_format_of :username, :with => /\A[-a-zA-Z0-9]+\Z/
  validates_format_of :email, :with => /\A[^@]+@([^@\.]+\.)+[^@\.]+\z/
  validates_uniqueness_of :username, :email, :case_sensitive => false
  
  def set_auth_token!
    self.auth_token = SecureRandom.urlsafe_base64(16)
  end
  
  def password
    @password || self.password_digest
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def verify_password(password)
    BCrypt::Password.new(self.password_digest) == password
  end
  
end
