class AddDefaultAuthCompletedToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :default_auth_incomplete, :boolean, default: nil
  end
end
