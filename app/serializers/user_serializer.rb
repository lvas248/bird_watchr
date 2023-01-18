class UserSerializer < ActiveModel::Serializer
  attributes :username
  
  has_many :birds, serializer: PostBirdSerializer
  has_many :posts
end
