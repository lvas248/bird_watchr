class Bird < ApplicationRecord
    has_many :posts, dependent: :destroy
    has_many :users, through: :posts

    validates :name, presence: true, uniqueness: true
    validates :description, presence: true
    validates :image_url, presence: true

end
