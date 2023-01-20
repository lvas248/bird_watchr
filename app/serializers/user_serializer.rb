class UserSerializer < ActiveModel::Serializer
  attributes :username
  
  has_many :birds
  has_many :posts



end
