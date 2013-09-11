class Tag < ActiveRecord::Base
  attr_accessible :title
  
  validates :title, :presence => true
  
  has_many :note_taggings, :dependent => :destroy
  has_many :notes, :through => :note_taggings, :source => :note
end
