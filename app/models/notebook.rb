class Notebook < ActiveRecord::Base
  attr_accessible :owner_id, :title

  validates :owner_id, :presence => true
  
  belongs_to :user, 
             :class_name => "User", 
             :foreign_key => :owner_id
  has_many :notes, :dependent => :destroy
  has_many :contributions, :dependent => :destroy
  has_many :contributing_users, :through => :contributions, :source => :user
  
end
