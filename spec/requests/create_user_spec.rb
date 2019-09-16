# frozen_string_literal: true

require 'rails_helper'

describe 'post a user to registrations route', type: :request do
  context 'with valid user credentials' do
    let(:post_user) { post '/users', params: { user: { email: 'yoyoyo@gmail.com', password: '123456' } } }

    it 'returns response with right credentials' do
      post_user
      # https://relishapp.com/rspec/rspec-expectations/docs/built-in-matchers
      user = JSON.parse(response.body)
      expect(user['email']).to eq('yoyoyo@gmail.com')
      expect(response.status).to eq(200)
    end

    it 'creates a user in the DB given the right credentials' do
      # binding.pry
      expect { post_user }.to change { User.count }.by(1)
    end
  end

  context 'with invalid user credentials' do
    let(:post_user) { post '/users', params: { user: { email: 'yoyoyo@gmail.com', password: '12' } } }

    it 'returns an error message when password is too short' do
      user = { email: 'yoyoyo@gmail.com', password: '12' }
      post '/users', params: { user: user }

      error_msg = JSON.parse(response.body)['error']
      expect(error_msg).to eq('Password is too short (minimum is 6 characters)')
      expect(response.status).to eq(422)
    end

    it 'returns an error message when email is invalid' do
      user = { email: 'asfds', password: '123456' }
      post '/users', params: { user: user }

      error_msg = JSON.parse(response.body)['error']
      expect(error_msg).to eq('Email is invalid')
      expect(response.status).to eq(422)
    end

    it 'does not create a new user in DB' do
      expect { post_user }.to change { User.count }.by(0)
    end
  end
end
