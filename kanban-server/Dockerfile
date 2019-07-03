FROM ruby:2.5.5

# Instala nossas dependencias
RUN apt-get update && apt-get install -qq -y --no-install-recommends \
build-essential nodejs libpq-dev imagemagick git-all

  # Seta nosso path
ENV INSTALL_PATH /kanban-server
  # Cria nosso diretório
RUN mkdir -p $INSTALL_PATH
  # Seta o nosso path como o diretório principal
WORKDIR $INSTALL_PATH
  # Copia o nosso Gemfile para dentro do container
COPY Gemfile ./
  # Seta o path para as Gems
ENV BUNDLE_PATH /gems
  # Copia nosso código para dentro do container
COPY . .                                 
