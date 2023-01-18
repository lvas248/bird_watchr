class PostSerializer < ActiveModel::Serializer
  attributes :id, :caption, :image_url, :location, :bird_name

  def bird_name
    object.bird.name
  end

 
 
 
end
