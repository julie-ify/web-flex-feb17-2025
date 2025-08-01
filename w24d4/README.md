# Advanced Topic: Build a Rails API-Only App

## Learning Objectives

By the end of this lecture, you will:

- Understand what an API-only Rails app is and why/when to use it
- Create a Rails API-only app with authentication and CRUD endpoints
- Structure a real-world API with models, controllers, and serializers
- Test endpoints using Postman or curl

## App Overview: Book Review API

- Users can:

  - Sign up / log in (JWT)
  - See a list of all book reviews
  - Submit reviews for books

- Data models:

  - User has many Reviews
  - Book has many Reviews
  - Review belongs to both a User and a Book

- Tools & Stack:

  - Rails 7+ (API-only mode)
  - PostgreSQL
  - bcrypt for password hashing
  - Postman or curl for testing

## Intro to Rails API-Only Mode

- What is a Rails API-only app?
- Use cases: SPAs, mobile apps, microservices
- How it differs from full-stack Rails (no views, controllers default to JSON)
- Real-world examples (e.g., GitHub API, Shopify API)

## Create the Project

```bash
ruby -v
rails -v
rails new book-review-api --api -T --database=postgresql
cd book-review-api
bundle install
```

- `--api`: starts in API-only mode
- `-T`: skips default test suite
- Configure `config/database.yml`

```bash
rails db:create # creates your database using the config in the config/database.yml
rails db:reset # rails db:drop db:create db:migrate db:seed
rails db:setup # rails db:create db:migrate
```

## Setup Models

```bash
rails g model User email:string password_digest:string
rails g model Book title:string author:string
rails g model Review rating:integer comment:text user:references book:references
rails db:migrate
```

- Add associations:

  - User: `has_many :reviews`
  - Book: `has_many :reviews`
  - Review: `belongs_to :user`, `belongs_to :book`

- Add `has_secure_password` to User

## Seed

- To ensure that the models are set properly, we can create model instances
- Create User, Book, Review in the seeds file

## Build Endpoints and Routes

```bash
rails g controller auth
rails g controller reviews
rails g controller books
```

- Routes:

- Controller Actions:
  - POST `/signup` -> sign up
  - POST `/login` -> login
  - GET `/books` -> list of all books
  - GET `/reviews` -> list of reviews
  - POST `/reviews` -> create a review (require auth)

## Encrypted password using bcrypt

- Gems:

```ruby
# Gemfile
gem 'bcrypt'
```

```bash
bundle install
```

## Testing the API

- Postman: Send requests with Authorization token
- curl: optional for quick terminal testing

## Validations & Error Handling

- Add model validations:

```ruby
# app/models/user.rb
validates :email, presence: true, uniqueness: true
```

```ruby
# app/models/review.rb
validates :rating, presence: true, inclusion: { in: 1..5 }
validates :comment, length: { minimum: 5 }
```

- In reviews controller:

```ruby
render json: { errors: review.errors.full_messages }, status: :unprocessable_entity
```

## CORs

```ruby
gem 'rack-cors'
```

```bash
bundle install
```

Edit the CORS initializer

```ruby
# config/initializers/cors.rb
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*' # Change '*' to your frontend domain in production, e.g., 'https://myfrontend.com'

    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
  end
end
```

## Useful Links

- [Rails guide](https://guides.rubyonrails.org/v7.1/index.html)
- [Using Rails for API-only Applications](https://guides.rubyonrails.org/v7.1/api_app.html)
- [Faker gem](https://github.com/faker-ruby/faker/tree/main)
