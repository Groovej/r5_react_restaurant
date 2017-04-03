require 'rails_helper'

describe Restaurant do
  it "return name " do
    expect("#{ Restaurant.new(name: 'mcDs') }").to eq 'mcDs'
  end
end
