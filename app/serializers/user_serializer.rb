class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :bio, :image_url

  has_many :likes
  has_many :posts
end
