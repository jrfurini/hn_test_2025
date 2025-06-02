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

## Post-challenge reflection

### What could be improved with more time

- **TypeScript and DTOs:** Apply stricter typing and use explicit DTOs for all API inputs and outputs.
- **TDD:** Tests were written in parallel with the main code, but there would be room for a more incremental approach with full coverage.
- **API Design:** Followed RESTful conventions and would add OpenAPI/Swagger documentation to facilitate usage and integration.
- **Automated Testing:** Expand test coverage in both frontend and backend, including integration and end-to-end tests (e.g., Cypress or Playwright).
- **UI/UX:** Improve the interface for usability and accessibility, adding visual feedback and comprehensive error handling.
- **API Robustness:** Add further validations, more detailed error messages, and rate limiting.
- **DevOps:** Add CI/CD pipelines, container healthchecks, and better environment variable management.
- **Documentation:** Expand documentation with usage examples, API schemas, and architecture diagrams.
- **Security:** Harden API endpoints, sanitize inputs, and implement authentication/authorization (such as JWT) if needed.
- **Environment Management:** All secrets are stored in environment variables; nothing sensitive is committed.
- **Performance:** Implement caching for frequent requests and optimize MongoDB indexes.
- **Docker:** Improve Dockerfiles to reduce image size and ensure reproducibility; add healthchecks.
- **Communication:** Commits and README were written clearly, but more examples and diagrams could be added.
- **Time Management:** The focus was on completing the main flow within the estimated time, leaving enhancements and extra features for later.

### Trade-off decisions

- **Focus on the main flow:** Prioritized delivering a functional end-to-end flow (snippet creation, summary via OpenAI, retrieval).
- **Minimalist interface:** Functional and straightforward UI to allow more focus on backend robustness and AI model integration.
- **Test coverage:** Included essential tests, but did not aim for full coverage to avoid compromising core delivery.
- **Error handling:** Implemented in a basic way for clarity and maintainability, with plans for more detailed handling in a production scenario.
- **Simple monorepo:** Keeping backend and frontend in the same repository made delivery easier, though it adds complexity to Docker and environment management.
