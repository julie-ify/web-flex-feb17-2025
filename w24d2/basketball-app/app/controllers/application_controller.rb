class ApplicationController < ActionController::Base
  rescue_from ActiveRecord::RecordNotFound, with: :page_not_found


  private
  def page_not_found
    render file: Rails.root.join('public', '404.html')
  end
end
