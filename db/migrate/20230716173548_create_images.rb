class CreateImages < ActiveRecord::Migration[6.1]
  def change
    create_table :images do |t|
      t.string :url
      t.string :public_id
      t.references :post, null: false, foreign_key: true

      t.timestamps
    end
  end
end
