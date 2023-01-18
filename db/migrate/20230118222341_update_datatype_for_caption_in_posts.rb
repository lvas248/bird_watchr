class UpdateDatatypeForCaptionInPosts < ActiveRecord::Migration[6.1]
  def change
    change_column :posts, :caption, :text
  end
end
