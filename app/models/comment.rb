class Comment < ActiveRecord::Base
  belongs_to :restaurant
  validates :restaurant, presence: true
  has_ancestry

  before_save :defaults

  def upvote
    self.rank = self.rank.to_i + 1
    self.save
  end

  private

  def defaults
    self.rank ||= 0
  end
end
