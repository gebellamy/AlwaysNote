class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username, :unique => true
      t.string :password_digest
      t.string :session_token
      t.string :email
      t.string :base_email, :unique => true
      t.string :auth_token

      t.timestamps
    end
    add_index :users, :username
    add_index :users, :session_token
    add_index :users, :email
  end
end
