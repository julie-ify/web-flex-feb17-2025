# Rails Review

## To Do

- [x] "Rails week" Conversation
- [x] MVC Review
- [x] Build simple Rails app
- [x] Handle `page not found` error

## Useful commands

- `rails new <project-name> --database=postgresql` to generate new rails app
- Use `rails generate <template name>` command to generate boilerplate codes
- Use `rails console` to run rails code in irb (interactive ruby)
- use `rails new <project-name> --api` to generate new rails `api` only app

## MVC Framework (Model-View-Controller)

![image](./rails%20mvc.png)

## Model

A Model is a Ruby class that:

- Represents a table in your database.
- Handles data logic and business rules.
- Uses Active Record, an ORM (Object-Relational Mapping) to provide built-in methods for querying and interacting with the database.
- Rails makes it easy to define relationships between tables using ActiveRecord associations:

```ruby
class Team < ApplicationRecord
	has_many :players
end

class Player < ApplicationRecord
	belongs_to :team
end
```

Now you can do things like:

```ruby
team = Team.first
team.players          # => returns all players that belong to this team

player = Player.first
player.team           # => returns the team that this player belongs to
```

### Migration

- A migration is a Ruby script used to create, modify, or delete database tables and columns in a consistent and version-controlled way.
- Rails tracks which migrations have been run in a special file called `schema.rb`.

Example: Creating a players Table:

```ruby
class CreatePlayers < ActiveRecord::Migration[7.1]
  def change
    create_table :players do |t|
      t.string :name
      t.string :position
      t.references :team, foreign_key: true, index: true
      t.timestamps
    end
  end
end
```

- `t.references :team` adds a `team_id` column
- `foreign_key: true` ensures database-level constraint
- `t.timestamps` adds `created_at` and `updated_at`

Migration Commands:

- `bin/rails db:migrate` - Runs all pending migrations
- `bin/rails db:rollback` - Undo the last migration
- `bin/rails db:reset` - Drop the DB, recreate it, and run all migrations and seeds

### Seeding the Database

- Seeding is the process of inserting default or sample data into your database.
- Defined in `db/seeds.rb` and run with `bin/rails db:seed`

## Controller

A Controller in Rails:

- Handles incoming HTTP requests and returns HTTP responses.
- Coordinates between the Model (data) and View (presentation).
- Implements business logic and defines what happens for each route.
- Grabs data from models and passes it to views or directly returns it as JSON.
- Controller has actions corresponding to each restful routes
- By default, controller actions will render `.erb` file with same name. Eg: `index` action renders `app/views/teams/index.html.erb` automatically unless told otherwise.

Controller Example:

```ruby
class TeamsController < ApplicationController
  def index
    @teams = Team.all
  end

	def show
    @team = Team.find(params[:id])
  end
end
```

Define the routes that point to our controller actions. Example:

```ruby
resources :teams, only: [:index, :show]
```

### Nested Routes

```ruby
resources :teams, only: [:index, :show] do
	resources :players
end
```

## View

- Responsible for displaying data to the user typically as HTML using **embedded Ruby (ERB)** templates.
- Combines templates and data to produce an HTTP response.
- Usually an `.html.erb` file (HTML + embedded Ruby).
- Receives data from the controller (via instance variables like @teams).
- Rails uses the ERB template engine (similar to EJS in JavaScript).
- You can use built-in [View Helper](https://guides.rubyonrails.org/v7.0/action_view_helpers.html) that make it easier to write HTML and links:

```code
<%= link_to 'Players', players_path %>

equivalent to: <a href="/players">Players</a>
```

## Useful Links

- [Active Record](https://guides.rubyonrails.org/v7.0/active_record_basics.html)
- [Action View](https://guides.rubyonrails.org/v7.0/action_view_overview.html)
- [Action Controller](https://guides.rubyonrails.org/v7.0/action_controller_overview.html)
- [Active Record Migrations](https://guides.rubyonrails.org/v7.0/active_record_migrations.html)
- [Rails Routing](https://guides.rubyonrails.org/v7.0/routing.html)
- [Faker gem](https://github.com/faker-ruby/faker) for generating realistic sample data during seeding.
