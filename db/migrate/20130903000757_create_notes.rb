class CreateNotes < ActiveRecord::Migration
  def change
    create_table :notes do |t|
      t.integer :owner_id, :null => false
      t.integer :notebook_id, :null => false
      t.string :title, :default => "Untitled Note"
      t.text :body

      t.timestamps
    end
    add_index :notes, :owner_id
    add_index :notes, :notebook_id
  end
end
