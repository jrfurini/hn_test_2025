# House Numbers - Frontend

## Technical Decisions

- **Framework:** We use Next.js with TypeScript to ensure a modern, scalable, and maintainable frontend, following best practices and keeping the structure as simple as possible.
- **Package Manager:** npm, for compatibility and ease of use.
- **UI:** React 19, leveraging the latest features and improvements.
- **Styling:** Default Next.js styling (can be extended as needed).
- **Testing:** (To be added) - Recommended: Jest and React Testing Library.
- **Docker:** The project is configured to run both locally and via Docker Compose, making testing and deployment easier.

## How to Run the Project

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

```bash
cd frontend
npm install
```

### Running Locally

```bash
npm run dev
```

The frontend will be available at http://localhost:3030

### Building for Production

```bash
npm run build
npm start
```

### Running with Docker Compose

The project can be started with Docker Compose from the root directory:

```bash
docker compose up
```

The frontend will be available at http://localhost:3030

---

## Project Structure

- `app/` - Main application code (Next.js App Router)
- `public/` - Static assets

## Notes

- All documentation and comments are in English, as required by the challenge.
- The project is being developed incrementally, following best practices.

# Frontend - Next.js

This project is the web interface for the House Numbers AI Snippet Service.

## Main Pages

- `/snippets` — Create a new snippet. Submit text and receive an AI-generated summary and the snippet ID.
- `/snippet` — Query a snippet by its ID. Enter the ID to retrieve the original text and its summary.

## Usage

- Start the frontend with:

  ```bash
  yarn dev
  ```

  or use Docker Compose from the project root.

- Make sure the backend is running and accessible at the expected address (see `.env` or proxy API routes).

## API Proxy

The frontend uses Next.js API routes to proxy requests to the backend:

- `POST /api/snippets` → Forwards to backend `/snippets`
- `GET /api/snippet?id=...` → Forwards to backend `/snippets/:id`

See the backend README for more details on the API.
