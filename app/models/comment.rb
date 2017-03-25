class Comment < ActiveRecord::Base
  belongs_to :restaurant
  validates :restaurant, presence: true
  has_ancestry

  def upvote
    self.rank = self.rank.to_i + 1
    self.save
  end
end
