# House Numbers - Backend

## Technical Decisions

- **Framework:** We use NestJS with TypeScript to ensure organization, scalability, and best practices, while keeping the structure as simple as possible, without unnecessary complexity.
- **Package Manager:** Yarn, for preference and development agility.
- **Database:** MongoDB, as required by the challenge.
- **AI Integration:** OpenAI (can be adapted to other providers if needed).
- **Testing:** Jest, already integrated with NestJS, to ensure TDD and code quality.
- **Docker:** The project will be configured to run both locally and via Docker Compose, making testing and deployment easier.

## How to Run the Project

### Prerequisites

- Node.js 20+
- Yarn
- MongoDB (local or via Docker)

### Installation

```bash
cd backend
cp .env.example .env # Edit with your OpenAI key and MongoDB configs
yarn install
```

### Running Locally

```bash
yarn start:dev
```

The backend will be available at http://localhost:3000

### Running with Docker Compose

(Coming soon: instructions and Docker files will be added)

---

## Main Endpoints

- `POST /snippets` - Creates a snippet and returns the AI-generated summary
- `GET /snippets/:id` - Retrieves a snippet by ID

---

## Notes

- The project is being developed incrementally, following TDD and best practices.
- All technical decisions are documented here to facilitate evaluation.
