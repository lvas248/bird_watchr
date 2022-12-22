class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :bio, :image_url, :isAdmin

  has_many :likes
  has_many :posts, serializer: PostSerializer
end
