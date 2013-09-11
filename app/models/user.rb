class User < ActiveRecord::Base
  
  require 'bcrypt'
  
  attr_accessible :username, :password, :email
  attr_reader :password
  
  validates :username, :password_digest, :email, :presence => true
  validates :password, :length => { :minimum => 6 }
  validates_format_of :username, :with => /\A[-a-zA-Z0-9]+\Z/
  validates_format_of :email, :with => /\A[^@]+@([^@\.]+\.)+[^@\.]+\z/
  validates_uniqueness_of :username, :base_email, :case_sensitive => false
  
  has_many :owned_notebooks, :class_name => "Notebook", :foreign_key => :owner_id
  has_many :contributions, :dependent => :destroy
  has_many :notebooks, :through => :contributions, :source => :notebook
  has_many :notes, :class_name => "Note", :foreign_key => :owner_id
  
  
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
  
  def set_base_email!
    if self.email.include?("+")
      new_email = self.email.split("+")
      base_email = "" + new_email.first + "@"
      new_email.each do |section|
        if section.include?("@")
          base_email += section.split("@").last
        end
      end
      self.base_email = base_email
    else
      self.base_email = self.email
    end
  end
  
  def to_json
    super(:only => [:username, :id])
  end
  
end
