class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :avatar, null: false, default: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Antu_im-invisible-user.svg/768px-Antu_im-invisible-user.svg.png"
      t.string :full_name
      t.string :role, null: false, default: "student"
      t.date :dob
      t.string :location

      t.timestamps
    end
  end
end
