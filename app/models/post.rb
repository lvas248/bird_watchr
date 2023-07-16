class Post < ApplicationRecord
  belongs_to :user
  belongs_to :bird
  has_one :image, dependent: :destroy
  # default_scope { order(:id => :desc) }

  accepts_nested_attributes_for :bird


  validates :location, presence: true
  validates :caption, presence: true



  def bird_attributes=(bird_attributes)
    if !self.bird && ( bird_attributes[:name] != '' && bird_attributes[:description] != '')
      self.bird = Bird.create(bird_attributes)
    end
  end

  def create_and_upload_image(new_image)
    result =  Cloudinary::Uploader.upload(new_image.tempfile.path, :transformation => 
    {:width => 400, :height => 400, :crop=> :lfill})
    self.create_image(url: result['url'], public_id: result['public_id'])
  end

  private




end
