class AuthController < ApplicationController
  def signup
    user = User.new(auth_param)
    if user.save
      render json: {
        user: {
          id: user.id,
          email: user.email,
          created_at: user.created_at
        }
      }, status: :created
    else
      render json: { error: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def login
    user = User.find_by(email: params[:email])

    if user&.authenticate(params[:password])
      render json: {
        user: {
          id: user.id,
          email: user.email,
          created_at: user.created_at
        }
      }
    else
      render json: { error: 'Invalid credentials'}, status: :unprocessable_entity
    end
  end

  private
  def auth_param
    params.require(:auth).permit(:email, :password)
  end
end
