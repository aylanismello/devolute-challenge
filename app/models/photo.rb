class Photo < ApplicationRecord
  validates :photo_url_full, :photo_url_thumbnail, :name, presence: true
  # has_one_attached :object
  belongs_to :user
end
