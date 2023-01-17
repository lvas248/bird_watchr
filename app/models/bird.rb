class Bird < ApplicationRecord
    has_many :posts
    has_many :users, through: :posts

 

    validates :name, presence: true, uniqueness: true
    validates :description, presence: true

end
