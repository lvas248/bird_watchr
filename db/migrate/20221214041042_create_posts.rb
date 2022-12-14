class CreatePosts < ActiveRecord::Migration[6.1]
  def change
    create_table :posts do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :bird, null: false, foreign_key: true
      t.string :caption

      t.timestamps
    end
  end
end
