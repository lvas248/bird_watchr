class RemoveIsAdminFromUsers < ActiveRecord::Migration[6.1]
  def change
    remove_column :users, :isAdmin
  end
end
