# frozen_string_literal: true

require 'rails_helper'

describe 'destroy a session route', type: :request do
  context 'when user is logged in' do
    # create a user to login
    before do
      @user = FactoryBot.create(:user)
      post '/users/sign_in', params: { user: { email: @user.email, password: @user.password } }
    end

    it 'responds with success message' do
      delete '/users/sign_out', params: { user: { email: @user.email, password: @user.password } }
      msg = JSON.parse(response.body)
      expect(response.status).to eq(200)
      expect(msg).to eq({ "success" => true })
    end
  end
end
