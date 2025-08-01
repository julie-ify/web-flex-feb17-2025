class BooksController < ApplicationController
  def index
    books = Book.includes(:reviews).all

    render json: books.map { |book |
      {
        id: book.id,
        title: book.title,
        author: book.author,
        average_rating: book.reviews.average(:rating)&.round(2)
      }
    }
  end
end
