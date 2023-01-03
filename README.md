# Backend Schedule Control
Schedule control application for employees of a company with a standard schedule.This application is generated using [LoopBack 4 CLI](https://loopback.io/doc/en/lb4/Command-line-interface.html) with the
[initial project layout](https://loopback.io/doc/en/lb4/Loopback-application-layout.html).

## UML Diagram
### 1. Class Diagram
![classDiagram](https://app.genmymodel.com/api/projects/_j7j-0Io8Ee29ie0vpi-P5A/diagrams/_j7kl4oo8Ee29ie0vpi-P5A/svg)
### 2. Usecase Diagram
![UsecaseDiagram](https://app.genmymodel.com/api/projects/_j7j-0Io8Ee29ie0vpi-P5A/diagrams/_5lpcoWxvEDu7ZNoOhwkNFg/svg)
#### I recommend following the steps below.

1. Clone the project `git clone https://github.com/UntalivanCruz/back-ScheduleControlApp.git`
2. [Installing dependencies / Getting started](#install-dep)
3. Clone the .env.template file and rename it to .env
4. Change environment variables
5. Build development environment `docker compose build && docker compose up -d`

## <a name="install-dep"></a>Installing dependencies / Getting started 

By default, dependencies were installed when this application was generated.
Whenever dependencies in `package.json` are changed, run the following command:

```sh
yarn install
```

### Run the application

```sh
yarn start
```

You can also run `node .` to skip the build step.

Open http://127.0.0.1:3000 in your browser.

### Rebuild the project

To incrementally build the project:

```sh
yarn run build
```

To force a full build by cleaning up cached artifacts:

```sh
yarn run rebuild
```

### Fix code style and formatting issues

```sh
yarn run lint
```

To automatically fix such issues:

```sh
yarn run lint:fix
```

### Other useful commands

- `yarn run migrate`: Migrate database schemas for models
- `yarn run openapi-spec`: Generate OpenAPI spec into a file
- `yarn run docker:build`: Build a Docker image for this application
- `yarn run docker:run`: Run this application inside a Docker container

### Tests

```sh
yarn test
```

## Enviroment

|#|Environment Variable|Example|Description|
|---|---|---|---|
|1|STAGE|dev|prod prod, dev staging|
|2|DB_HOST|MongoDB|Host where the database is located|
|3|DB_PROTOCOL|mongodb|DB Protocol using|
|4|MONGO_INITDB_ROOT_USERNAME|root|Mongo Database user|
|5|MONGO_INITDB_ROOT_PASSWORD|123456|Password of the Mongo database|
|6|DB_NAME|ScheduleControlDB|Name of the database|
|7|DB_PORT|27017|Database port|
|8|PORT|3000|Port where the http application runs
|9|HOST|localhost|api Path where the api is located|

## Docker 

DockerFile in Hub: [untalivancruz/backend-schedule-control](https://hub.docker.com/r/untalivancruz/backend-schedule-control)

I recommend using `docker-compose` for development and `docker-compose.prod` for deploying to production

Run this command:
`docker compose -f docker-compose.prod.yml build`
### What's next

Please check out [LoopBack 4 documentation](https://loopback.io/doc/en/lb4/) to
understand how you can continue to add features to this application.

[![LoopBack](https://github.com/loopbackio/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)
