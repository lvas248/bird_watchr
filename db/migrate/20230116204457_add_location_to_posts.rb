class AddLocationToPosts < ActiveRecord::Migration[6.1]
  def change
    add_column :posts, :location, :text
  end
end
