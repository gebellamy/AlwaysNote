class Contribution < ActiveRecord::Base
  attr_accessible :notebook_id, :user_id
  
  validates :notebook_id, :user_id, :presence => true
  validates :notebook_id, :uniqueness => { :scope => :user_id }
  
  belongs_to :user
  belongs_to :notebook
end
