class CreateBirds < ActiveRecord::Migration[6.1]
  def change
    create_table :birds do |t|
      t.string :name
      t.string :description
      t.string :image_url

      t.timestamps
    end
  end
end
