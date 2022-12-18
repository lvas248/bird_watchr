class User < ApplicationRecord
    has_secure_password
    validates :username, presence: true, uniqueness: true

    has_many :likes
    has_many :posts
    has_many :birds, through: :posts
    
end
