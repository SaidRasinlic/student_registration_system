class AddImportedFromCsvToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :imported_from_csv, :boolean, default: false
  end
end
