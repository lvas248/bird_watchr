class CommentSerializer < ActiveModel::Serializer
  attributes :id, :content, :commenter

  def commenter
    {username: object.user.username, id: object.user.id}
  end


end
