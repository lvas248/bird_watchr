class BirdSerializer < ActiveModel::Serializer
  attributes :name, :description, :image_url, :id
end
