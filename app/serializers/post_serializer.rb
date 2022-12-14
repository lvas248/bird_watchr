class PostSerializer < ActiveModel::Serializer
  attributes :id, :caption
  has_one :user
  has_one :bird
end
