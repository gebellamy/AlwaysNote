class NoteTagging < ActiveRecord::Base
  attr_accessible :note_id, :tag_id
  
  validates :note_id, :tag_id, :presence => true
  validates :note_id, :uniqueness => { :scope => :tag_id }
  
  belongs_to :tag
  belongs_to :note
end
