class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.string :title, :unique => true, :null => false

      t.timestamps
    end
    add_index :tags, :title
  end
end
