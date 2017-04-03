require 'rails_helper'

describe 'restaurants', js: true do
  let!(:restaurant) { Restaurant.create(name: 'Hamburger City') }

  it "list restaurants" do
    visit  '/'
    expect(page).to have_content(restaurant.name)
  end
end
