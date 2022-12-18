class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :bio, :image_url

  has_many :likes
end
