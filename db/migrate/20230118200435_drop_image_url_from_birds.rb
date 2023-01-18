class DropImageUrlFromBirds < ActiveRecord::Migration[6.1]
  def change
    remove_column :birds, :image_url
  end
end
