class Review < ApplicationRecord
  belongs_to :user
  belongs_to :book

  validates :rating, presence: true, inclusion: { in: 1..5, message: 'should be 1..5' }
  validates :comment, length: { minimum: 5 }
end
