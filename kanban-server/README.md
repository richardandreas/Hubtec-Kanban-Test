# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## Run rails command:
docker-compose run --rm server bundle exec rails ...

## Run rake command:
docker-compose run --rm server bundle exec rake ...

## Run rspec command:
docker-compose run --rm server bundle exec rspec ...

### Run rspec task model tests:
docker-compose run --rm server bundle exec rspec spec/models/task_spec.rb

### Run rspec task request tests:
docker-compose run --rm server bundle exec rspec spec/request/task_request_spec.rb