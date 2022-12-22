class User < ApplicationRecord
    has_secure_password
    validates :username, presence: true, uniqueness: true

    has_many :likes, dependent: :destroy
    has_many :posts, dependent: :destroy
    has_many :comments, dependent: :destroy
    has_many :birds, through: :posts

end
