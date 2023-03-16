# FROM ubuntu:18.04
# WORKDIR /app/test

# COPY . .
# CMD ["tail", "-f", "/dev/null"]

FROM ubuntu
# FROM postgres:14

RUN apt-get update && apt-get install -y iputils-ping
RUN apt-get update && apt-get install -y telnet
RUN apt-get update && apt-get install -y postgresql-client
CMD ["tail", "-f", "/dev/null"]

# CMD bash