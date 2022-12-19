class PostSerializer < ActiveModel::Serializer
  attributes :id, :caption, :image_url, :user
 
  has_one :user, serializer: PostUserSerializer
  has_one :bird
  has_many :likes
  has_many :comments



 
end
