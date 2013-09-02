class AddAuthenticatedColumnToUsers < ActiveRecord::Migration
  def change
    add_column :users, :authenticated, :boolean, :default => false
  end
end
