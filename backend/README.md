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
- MongoDB (via Docker)

### Installation

```bash
cd backend
cp .env.example .env # Edit with your OpenAI key and MongoDB
yarn install
```

#### Important:

For running inside docker, you need to create a .env_docker and use "mongo" as address for MongoDB server.

### Running Locally

```bash
yarn start:dev
```

The backend will be available at http://localhost:3000

### Running with Docker Compose

```bash
cd .. # In the root folder of project where "docker-compose.yml" file exists.
docker compose up -d
```

#### Tip:

    - To remove all containers after test

```bash
cd .. # In the root folder of project where "docker-compose.yml" file exists.
docker compose down
```

---

## Main Endpoints

- `POST /snippets` - Creates a snippet and returns the AI-generated summary

  - Body:

    ```
    {
        "text": "your text here"
    }
    ```

  - Response:
    ```
    {
        "text": "your text here",
        "summary": "summary from OpenAI",
        "\_id": "683df667191c4d87f6b6d099",
        "createdAt": "2025-06-02T19:07:19.130Z",
        "updatedAt": "2025-06-02T19:07:19.130Z",
        "\_\_v": 0
    }
    ```

- `GET /snippets/:id` - Retrieves a snippet by ID
  - Response:
    ```
    {
        "text": "your text here",
        "summary": "summary from OpenAI",
        "_id": "683df667191c4d87f6b6d099",
        "createdAt": "2025-06-02T19:07:19.130Z",
        "updatedAt": "2025-06-02T19:07:19.130Z",
        "__v": 0
    }
    ```

---

## Testing with Postman and cURL

### Using Postman

- **POST /snippets**

  - Method: `POST`
  - URL: `http://localhost:3000/snippets`
  - Headers: `Content-Type: application/json`
  - Body (raw, JSON):
    ```json
    {
      "text": "Your text to be summarized by OpenAI."
    }
    ```
  - Click "Send" and check the response with the generated summary.

- **GET /snippets/:id**
  - Method: `GET`
  - URL: `http://localhost:3000/snippets/{id}`
  - Replace `{id}` with the ID returned when creating the snippet.

### Using cURL

- **Create a snippet:**

  ```bash
  curl -X POST http://localhost:3000/snippets \
    -H "Content-Type: application/json" \
    -d '{"text": "Your text to be summarized by OpenAI."}'
  ```

- **Fetch a snippet by ID:**
  ```bash
  curl http://localhost:3000/snippets/{id}
  ```
  Replace `{id}` with the ID returned in the POST response.

---

## Notes

- The project is being developed incrementally, following TDD and best practices.
- All technical decisions are documented here to facilitate evaluation.
