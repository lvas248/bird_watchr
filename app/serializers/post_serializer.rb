class PostSerializer < ActiveModel::Serializer
  attributes :id, :caption, :location, :bird_info, :date, :image_url

 has_one :image

  def bird_info
    {name: object.bird.name, id: object.bird.id, description: object.bird.description}
  end

  def date
    object.created_at.strftime('%A - %b %d, %Y')
  end

  def image_url
    object.image.url
  end




end
