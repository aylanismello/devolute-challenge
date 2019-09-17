class AddNameColumnToPhotos < ActiveRecord::Migration[6.0]
  def change
    add_column :photos, :name, :string
  end
end
