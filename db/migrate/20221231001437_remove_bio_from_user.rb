class RemoveBioFromUser < ActiveRecord::Migration[6.1]
  def change
    remove_column :users, :bio
  end
end
