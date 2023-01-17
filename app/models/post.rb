class Post < ApplicationRecord
  belongs_to :user
  belongs_to :bird

  accepts_nested_attributes_for :bird

  has_many :likes, dependent: :destroy
  has_many :comments, dependent: :destroy
  validates :location, presence: true
  validates :caption, presence: true
end
