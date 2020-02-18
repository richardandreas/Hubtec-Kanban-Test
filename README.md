# Hubtec-Kanban-Test

This project is part of the selection process for a programmer job. It consists of a Full Stack application with Rails running the Back- and React running the Front-end. The app runs a Kanban-style software where users can create an account and manage various tasks. You can visit this app on heroku here: https://richards-kanban-app.herokuapp.com/login.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

First let's install the software needed to run this project (if you haven't yet). You'll be needing the following tools:

* Linux Distro (I used Ubuntu 19.04)
* Docker
* Docker-Compose

To install Docker, you can run the commands below. You can also visit the offitial documentation here: https://docs.docker.com/install/

```
sudo apt update

sudo apt install apt-transport-https ca-certificates curl software-properties-common

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"

sudo apt update

apt-cache policy docker-ce

sudo apt install docker-ce

```

To install Docker-Compose, simply run the commands below. Alternatively, you may want to visit the offitial website: https://docs.docker.com/compose/install/

```
sudo curl -L "https://github.com/docker/compose/releases/download/1.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose
```

### Installing

First, let's pull this repository to your local machine (if you havent yet):
```
git pull https://github.com/Ricardo959/Hubtec-Kanban-Test.git
```
Then, let's cd into the main app directory and start the server. Call Docker Compose inside the main directory of the project to build the images:
```
docker-compose build
```
Now, let's check that Docker Compose built the images correctly on your local machine. Run the Docker command to list your images:
```
docker images
```
You output should look like this, if you're using docker for the first time:
```
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
kanban_client       latest              f2aa510e36c4        20 hours ago        1.25GB
kanban_server       latest              0dcd4324f4e1        46 hours ago        1.16GB
node                latest              70ea061fdf3a        8 days ago          907MB
ruby                2.5.5               a6c0b630f2b8        9 days ago          873MB
postgres            9.5                 36ecf07995f9        2 weeks ago         227MB
node                11.15.0-alpine      f18da2f58c3d        4 weeks ago         75.5MB
```
Now, all you need is to start the server:
```
docker-compose up
```
React will be lisning on http://localhost:8000.
Rails will be lisning on http://localhost:3000.

## Running the tests

### Run rspec task model tests:
```
docker-compose run --rm server bundle exec rspec spec/models/task_spec.rb
```

### Run rspec task request tests:
```
docker-compose run --rm server bundle exec rspec spec/request/task_request_spec.rb
```
