class CommentSerializer < ActiveModel::Serializer
  attributes :id, :content, :commenter, :post_id

  def commenter
    {username: object.user.username, id: object.user.id}
  end

  def post_id
    object.post.id
  end


end
