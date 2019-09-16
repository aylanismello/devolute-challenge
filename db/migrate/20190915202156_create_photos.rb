class CreatePhotos < ActiveRecord::Migration[6.0]
  def change
    create_table :photos do |t|
      t.belongs_to :user
      t.string :photo_url_full
      t.string :photo_url_thumbnail
      t.timestamps
    end
  end
end
