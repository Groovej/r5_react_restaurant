require 'rails_helper'

describe 'restaurants_comments', js: true do
  let!(:restaurant) { Restaurant.create(name: 'Hamburger City', description: 'Collest hambergers') }
  context "new comments" do
    before do
      visit restaurant_path(restaurant)
    end

    it "show restaurant description" do
      expect(page).to have_content(restaurant.description)
    end

    it "show restaurant description" do
      within '.row form' do
        fill_in :author, with: 'John Smith'
        fill_in :body, with: 'Great Burgers'
        find_button('Submit').click()
      end
      expect(Comment.all.size).to eq 1
      expect(page.body).to have_content('John Smith')
      expect(page.body).to have_content('Great Burgers')
    end
  end

  context "replies" do
    let!(:comment) { Comment.create(author: 'GB', body: "Delicious food!", restaurant: restaurant)}

    it "upvotes", :focus do
      visit restaurant_path(restaurant)
      find_button('+1').click()
      expect(find('.commnent.row .label.secondary.float-right')).to have_content('1')
      screenshot_and_open_image
    end
  end

  context "polling comment" do
    let!(:comment) { Comment.create(author: 'GB', body: "Delicious food!", restaurant: restaurant)}
    it 'updates due long polling' do
      visit restaurant_path(restaurant)
      Comment.create!(author: 'John', body: 'I disagree', restaurant: restaurant, parent: comment)
      expect(page).to have_content('I disagree')
    end
  end
end
