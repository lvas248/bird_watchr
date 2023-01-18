class PostSerializer < ActiveModel::Serializer
  attributes :id, :caption, :image_url, :location
 
  belongs_to :user, serializer: PostUserSerializer
  belongs_to :bird, serializer: PostBirdSerializer




 
end
