# House Numbers - Monorepo

## Project Structure

This repository contains two main projects:

- `backend/` — NestJS API with MongoDB and OpenAI integration. See `backend/README.md` for setup, usage, and API details.
- `frontend/` — Next.js web application for interacting with the snippet service. See `frontend/README.md` for setup and usage.

Each project has its own README with specific instructions, environment variables, and usage examples.

## Running with Docker Compose

To start all services (backend, frontend, and MongoDB) using Docker Compose, run from the root directory:

```bash
docker-compose up -d
```

To stop and remove all containers:

```bash
docker-compose down
```

For more details and advanced usage, refer to the README in each subproject.
