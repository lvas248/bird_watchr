class PostSerializer < ActiveModel::Serializer
  attributes :id, :caption, :image_url, :location, :bird_info

  def bird_info
    {name: object.bird.name, id: object.bird.id}
  end

 
 
 
end
