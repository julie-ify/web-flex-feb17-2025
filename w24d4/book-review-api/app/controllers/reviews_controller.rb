class ReviewsController < ApplicationController
  def index
    reviews = Review.all
    render json: reviews
  end

  def create
    review = Review.new(review_param)
    if review.save
      render json: review, status: :created
    else
      render json: { error: review.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private
  def review_param
    params.require(:review).permit(:rating, :comment, :user_id, :book_id)
  end
end
