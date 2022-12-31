class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :isAdmin

  has_many :likes
  has_many :posts, serializer: PostSerializer
end
