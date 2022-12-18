class Post < ApplicationRecord
  belongs_to :user
  belongs_to :bird

  validates :caption, presence: true
  validates :image_url, presence: true
end
