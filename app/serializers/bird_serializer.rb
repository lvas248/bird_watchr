class BirdSerializer < ActiveModel::Serializer
  attributes :id, :name, :species, :description, :image_url
end
