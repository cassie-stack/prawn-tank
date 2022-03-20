# Prawn Tank

## Dependencies

Please install the following on your host system:

- [Docker](https://www.docker.com/)
  - Make sure [BuildKit](https://docs.docker.com/develop/develop-images/build_enhancements/) is enabled
- [Docker Compose](https://docs.docker.com/compose/)

## Running in development mode

It is recommended that this project be developed inside VS Code. A development container is already set up and can be enabled within VS Code by following [these instructions](https://code.visualstudio.com/docs/remote/containers#_quick-start-open-an-existing-folder-in-a-container).

Some additional services are required as dependencies of Prawn Tank - run them with the following command (run from the project root directory):

```bash
docker-compose -f docker/docker-compose.dev.yml up -d
```

Now, from within the development container, the following commands will start up the services:

```bash
# Use development environment configuration
cp .env.dev .env

# To run the API (assumes you're in the project root directory)
cd api
npm install
npm run dev

# To migrate and seed the database
npm run migrate

# To run the client (assumes you're in the project root directory)
cd client
npm install
npm run dev
```
