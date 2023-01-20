class Bird < ApplicationRecord
    has_many :posts
    has_many :users, through: :posts
    default_scope {order(:name => :asc)}
 

    validates :name, presence: true, uniqueness: true
    validates :description, presence: true

end
