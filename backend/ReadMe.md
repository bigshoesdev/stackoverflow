# Backend for Stack Overflow Application


The backend of this application:
- Manages data for questions, answers, comments, and users.
- Integrates with **Elasticsearch** for full-text search capabilities.
- Uses **Sequelize ORM** for database interactions with **PostgreSQL**.
- Provides a RESTful API that the frontend can consume.

## Technologies Used

- **Node.js**: A JavaScript runtime built on Chrome's V8 engine.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Express**: A minimal and flexible Node.js web application framework.
- **Sequelize**: A promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite, and Microsoft SQL Server.
- **PostgreSQL**: A powerful, open-source relational database.
- **Elasticsearch**: A search and analytics engine.
- **Docker** and **Docker Compose**: For container orchestration.

## Installation

### Prerequisites

- **Docker** and **Docker Compose**

## Running with Docker Compose

### Steps

1. **Run the application using Docker Compose**:
   ```bash
   docker-compose up --d
   ```

3. **Stop the services**:
   To stop the services, use:
   ```bash
   docker-compose down
   ```

## Features

- **RESTful API**: Endpoints for managing questions, answers, comments, and users.
- **Elasticsearch Integration**: Full-text search with support for `match`, `term`, and `match_all` queries.
- **Database Management**: Uses Sequelize ORM for database operations.
- **Dockerized Environment**: Easy deployment and environment management using Docker Compose.
- **Error Handling**: Centralized error handling and logging.

## API Endpoints

### Question Endpoints
- `GET /questions/:id`: Retrieve a specific question by ID.

### Search Endpoint
- `GET /questions/search?query=your-query`: Search questions using Elasticsearch.
- `GET /questions/user/{userId}`: Search user questions using Elasticsearch.