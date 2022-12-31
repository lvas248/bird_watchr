class PostSerializer < ActiveModel::Serializer
  attributes :id, :caption, :image_url
 
  has_one :user, serializer: PostUserSerializer
  has_one :bird, serializer: PostBirdSerializer
  has_many :comments
  has_many :likes



 
end
