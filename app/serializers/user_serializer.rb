class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :isAdmin
  
  has_many :birds, serializer: PostBirdSerializer
  has_many :posts
end
