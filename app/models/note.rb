class Note < ActiveRecord::Base
  attr_accessible :body, :notebook_id, :owner_id, :title
  
  belongs_to :user, :class_name => "User", :foreign_key => :owner_id
  belongs_to :notebook
  
end
