class CreateNoteTaggings < ActiveRecord::Migration
  def change
    create_table :note_taggings do |t|
      t.integer :note_id, :null => false
      t.integer :tag_id, :null => false

      t.timestamps
    end
    add_index :note_taggings, :note_id
    add_index :note_taggings, :tag_id
    add_index :note_taggings, [:note_id, :tag_id], :unique => true
  end
end
