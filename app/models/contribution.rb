class Contribution < ActiveRecord::Base
  attr_accessible :notebook_id, :user_id
  
  validates :notebook_id, :user_id, :presence => true
  
  belongs_to :user
  belongs_to :notebook
end
