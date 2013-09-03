class CreateContributions < ActiveRecord::Migration
  def change
    create_table :contributions do |t|
      t.integer :user_id
      t.integer :notebook_id

      t.timestamps
    end
    add_index :contributions, :user_id
    add_index :contributions, :notebook_id
    add_index :contributions, [:user_id, :notebook_id], :uniqueness => true
  end
end
