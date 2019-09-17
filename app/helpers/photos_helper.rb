# frozen_string_literal: true

module PhotosHelper
  def self.save_tmp_img(data_url, file_name)
    new_file = Tempfile.new(file_name)
    new_file.write(data_url)
    new_file.path
    # file_type, data = PhotosHelper.split_base_64(data_url)
    # File.open(file_path, 'wb') { |f| f.write(data) }
  end

  def self.get_obj_name(file_name)
    time_stamp = Time.now.to_i
    "#{time_stamp}_#{file_name}"
  end

  def self.split_base_64(uri)
    meta, data = uri.split(',')
    # "data:image/jpeg;base64"

    file_type = meta.match(%r{/[a-z]+;})[0][1...-1]

    [
      file_type,
      data
    ]
  end
end
