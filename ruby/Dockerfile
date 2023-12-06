FROM ruby:3.0.2

WORKDIR /app
RUN gem install bundler -v 2.4.22

COPY . .
RUN bundle install

RUN chmod +x entrypoint.sh
ENTRYPOINT ["/app/entrypoint.sh"]
