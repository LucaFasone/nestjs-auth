# 🚀 NestJS Microservices Monorepo Auth
---

## 🏗 Architecture

The system is composed of 3 main containers managed via Docker Compose:

```mermaid
    Client[Client / Postman] -- HTTP:3000 --> Gateway[API Gateway]
    Gateway -- TCP:3001 --> Auth[Auth Microservice]
    Auth -- Mongoose --> DB[(MongoDB)]
```

### Components

- **API Gateway**: Handles HTTP requests, validation, rate limiting, and forwards logic via TCP.
- **Authentication Service**: A TCP microservice responsible for user management, JWT issuance, and database interaction.
- **MongoDB**: Persistent data storage.

---

## 🛠 Tech Stack

- **Framework**: NestJS (Monorepo Structure)
- **Transport**: TCP (Microservices)
- **Database**: MongoDB & Mongoose
- **Containerization**: Docker & Docker Compose (Multi-stage builds)
- **Validation**: Joi (env vars), `class-validator` (DTOs)
- **Security**: JWT, BCrypt, Throttling (Rate Limiting)
- **Extras**: Custom Global Filters, Interceptors, Repository Pattern

---

## ⚡️ Quick Start (Recommended)

You don't need Node.js or MongoDB installed on your local machine — **Docker is all you need**.

### 1) Clone the repository

```bash
git clone <your-repo-link>
cd <your-repo-name>
```

### 2) Run with Docker Compose

```bash
docker-compose up --build
```

### 3) Wait for initialization

Wait until you see **"Nest application successfully started"** in the logs for both the Gateway and Authentication services.

✅ The API will be available at: **http://localhost:3000**

---

## 🔌 API Endpoints

You can test the API using Postman or cURL.

| Method | Endpoint         | Description                    | Auth Required |
|-------:|------------------|--------------------------------|:------------:|
| GET    | `/health`        | System health check            | ❌ No         |
| POST   | `/auth/register` | Register a new user            | ❌ No         |
| POST   | `/auth/login`    | Login & receive JWT            | ❌ No         |
| GET    | `/auth/users`    | List all users (sanitized)     | 🔒 Yes |
| GET    | `/auth/me`       | Get current profile            | 🔒 Yes |

---


## 📝 Notes 

- **Environment Variables**: For the purpose of this challenge and ease of review, `docker-compose.yml` contains the necessary environment variables (including secrets). In a real production environment, these would be injected via a secure `.env` file or a secrets manager.
- **Networking**: Services communicate using internal Docker DNS (e.g. `authentication:3001`). The Gateway listens on `0.0.0.0` to ensure accessibility from the host machine via port mapping.
* **Rate Limiting & Caching:** Throttling limits and Cache TTLs are intentionally configured with low thresholds for testing purposes. In a production environment, I would implement a more robust strategy, utilizing active cache invalidation patterns and distributed caching (e.g., Redis), rather than relying solely on short TTLs.

---

## Postman collection
https://.postman.co/workspace/My-Workspace~b497c4c2-fbb8-4a4a-85a3-3bdd4f2634b9/collection/42124406-b7ec276a-e672-4371-9080-501f46e4ea50?action=share&creator=42124406