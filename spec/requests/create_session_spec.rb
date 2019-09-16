# frozen_string_literal: true

require 'rails_helper'

describe 'create a session route', type: :request do
  before do
    @user = FactoryBot.create(:user)
  end

  context 'with valid user credentials' do
    before do
      user = { email: @user.email, password: @user.password }
      post '/users/sign_in', params: { user: user }
    end

    it 'returns success' do
      user = JSON.parse(response.body)
      expect(user['email']).to eq(@user.email)
      expect(response.status).to eq(200)
    end
  end

  context 'with invalid user credentials' do
    before do
      user = { email: 'fake@gmail.com', password: '123456' }
      post '/users/sign_in', params: { user: user }
    end

    it 'returns correct error message' do
      error_msg = JSON.parse(response.body)['error']
      expect(error_msg).to eq('invalid login attempt')
    end
  end
end
