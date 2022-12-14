class PostSerializer < ActiveModel::Serializer
  attributes :id, :caption, :image_url
  has_one :user
  has_one :bird

 
end
