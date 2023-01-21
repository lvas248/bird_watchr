class Post < ApplicationRecord
  belongs_to :user
  belongs_to :bird
  # default_scope { order(:id => :desc) }

  accepts_nested_attributes_for :bird

  validates :location, presence: true
  validates :caption, presence: true



  def bird_attributes=(bird_attributes)
    if !self.bird && ( bird_attributes[:name] != '' && bird_attributes[:description] != '')
      self.bird = Bird.create(bird_attributes)
    end
  end


end
