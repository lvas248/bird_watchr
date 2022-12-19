class CommentSerializer < ActiveModel::Serializer
  attributes :id, :content, :user
  has_one :user, serializer: PostUserSerializer
  has_one :post, serializer: PostSerializer
end
