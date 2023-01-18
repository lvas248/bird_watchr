class Post < ApplicationRecord
  belongs_to :user
  belongs_to :bird

  accepts_nested_attributes_for :bird

  validates :location, presence: true
  validates :caption, presence: true
end
