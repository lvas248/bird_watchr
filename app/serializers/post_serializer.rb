class PostSerializer < ActiveModel::Serializer
  attributes :id, :caption, :image_url, :location, :bird_info, :date

  def bird_info
    {name: object.bird.name, id: object.bird.id, description: object.bird.description}
  end

  def date
    object.created_at.strftime('%A - %b %d, %Y')
  end

 
end
