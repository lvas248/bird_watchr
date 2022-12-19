class Post < ApplicationRecord
  belongs_to :user
  belongs_to :bird
  has_many :likes, dependent: :destroy
  has_many :comments, dependent: :destroy

  validates :caption, presence: true
  validates :image_url, presence: true
end
