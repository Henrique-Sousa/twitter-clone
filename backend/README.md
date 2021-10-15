# Twitter Clone Back End

## Instructions to run locally

create a `.env` file based on `.env.sample` with your database credentials. \
`NODE_ENV` must be `production`
```bash
# generate jwt keys
npm run keys
# install dependencies
npm i
# build the backend
npm run build
# start the backend 
npm start
```

## Instructions to run locally with docker and docker-compose

create a `.env` file based on `.env.sample` \
`NODE_ENV` must be `production` \
`POSTGRES_HOST` must be `db` \
the remaining variables can have any value
```bash
# execute docker compose first to create the database 
docker-compose up
# wait until database system is ready to accept connections and:
docker-compose down
# run it again to start the project
docker-compose up
```