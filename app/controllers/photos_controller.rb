# frozen_string_literal: true

# require 'base64'
require 'tempfile'

class PhotosController < ApplicationController

  # https://s3.console.aws.amazon.com/s3/buckets/aylan/?region=us-west-2&tab=overview
  def create
    file = photo_params[:base64_file]
    file_name = photo_params[:name]
    tmp_file_path = PhotosHelper::save_tmp_img(file, file_name)


    s3 = Aws::S3::Resource.new(region: 'us-west-2')

  
    obj = s3.bucket('aylan').object(PhotosHelper::get_obj_name(file_name))
    obj.upload_file(tmp_file_path)
    # obj.public_url

    @photo = Photo.new(
      photo_url_full: obj.public_url,
      photo_url_thumbnail: obj.public_url,
      name: file_name,
      user_id: photo_params[:user_id]
    )

    if @photo.save
      render json: { success: 'this is a thing' }
    else
      render json: { error: 'damn' }, status: 422
    end
  end

  def index
    # gets all user's picture
    User.find(user_params[:id]).photos
  end

  private

  def photo_params
    params.require(:photo).permit(:base64_file, :name, :type, :user_id)
  end

  def photo_params
    params.require(:user).permit(:id)
  end
end
