class CreateNotebooks < ActiveRecord::Migration
  def change
    create_table :notebooks do |t|
      t.integer :owner_id
      t.string :title, :default => "New Notebook"

      t.timestamps
    end
    add_index :notebooks, :owner_id
  end
end
