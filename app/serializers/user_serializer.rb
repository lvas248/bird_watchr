class UserSerializer < ActiveModel::Serializer
  attributes :username, :formatted_posts
  
  has_many :birds
  # has_many :posts

  def formatted_posts
    object.posts.order(id: :desc).map do |p| 
      { 
       id: p.id,
       location: p.location,
       bird_info: { name: p.bird.name, id: p.bird.id, description: p.bird.description }, 
       caption: p.caption, 
       image_url: p.image.url, 
       date: p.created_at.strftime('%A - %b %d, %Y') 
      }
    end

  end



end
