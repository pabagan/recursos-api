# Dockerized MongoDB
MongoDB v3.4.0 with Docker + Docker Compose with persistent data at host.

* [MongoDB](https://www.mongodb.com/es).
* [MongoDB official docker image](https://hub.docker.com/_/mongo/).

## Config Container

Rename `.env-demo` to `.env` to set container environment variables.

```bash
CONTAINER_NAME=recursos-mongodb

MONGODB_USER: "user"
MONGODB_DATABASE: "dbname"
MONGODB_PASS: "pass"

# mongodb local storage
MONGODB_PERSISTENT=./mongodb-data
```

## Start container
```bash
docker-compose up
```

This will make MongoDB available at `http://0.0.0.0:27017`.

### Access MongoDB Shell

After `docker-compose up` log into MongoDB container by running `./sh/log-mongodb.sh`. Once inside the container:

```bash
# enter mongo shell
mongo
# See Version
mongo -version
```

## Data persistence
On container's run a folder will be created according to environment variable at `.env`.



## Requirements

* [Docker](https://docs.docker.com/installation/).
* [Docker Compose](https://docs.docker.com/compose/).
* [Docker Machine](https://docs.docker.com/machine/) it needed to run compose for Mac and Windows users.