# User Management API

## Project Overview

This is a simple Node.js and Express-based User Management API that allows performing CRUD operations on users, such as creating, retrieving, updating, and deleting user data.

## Folder Structure

```
user-management-api/
├── node_modules/
├── src/
│   ├── config/
│   │   ├── db.js
│   ├── controllers/
│   │   ├── userController.js
│   ├── routes/
│   │   ├── userRoutes.js
│   ├── .env
│   ├── app.js
│   ├── server.js
├── package.json
├── package-lock.json
```

## Setup Instructions

### Prerequisites

- Install [Node.js](https://nodejs.org/en/) (latest LTS version recommended)
- Install [MySQL](https://www.mysql.com/downloads/)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/user-management-api.git
   ```
2. Navigate to the project directory:
   ```sh
   cd user-management-api
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Configure the `.env` file with your database credentials:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=userdb
   ```
5. Start the MySQL server and create a database:
   ```sql
   CREATE DATABASE userdb;

   USE userdb;

   CREATE TABLE users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(100) NOT NULL,
       email VARCHAR(100) NOT NULL UNIQUE,
       age INT NOT NULL
   );
   ```
6. Start the server:
   ```sh
   cd src
   node server.js
   ```
   You should see:
   ```
   Server running on port 5000
   ```

## API Endpoints

### 1. Create a User

**Endpoint:** `POST /api/users`

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "age": 30
}
```

**Response:**

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "johndoe@example.com",
  "age": 30
}
```

### 2. Get All Users

**Endpoint:** `GET /api/users`

**Response:**

```json
{
  "message": "No user data available"
}
```

or

```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "johndoe@example.com",
    "age": 30
  }
]
```

### 3. Get a User by ID

**Endpoint:** `GET /api/users/:id`

**Response:**

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "johndoe@example.com",
  "age": 30
}
```

### 4. Update a User

**Endpoint:** `PUT /api/users/:id`

**Request Body (partial updates allowed):**

```json
{
  "name": "John Smith"
}
```

**Response:**

```json
{
  "message": "User updated successfully"
}
```

### 5. Delete a User

**Endpoint:** `DELETE /api/users/:id`

**Response:**

```json
{
  "message": "User deleted successfully"
}
```

## Testing with Postman

1. Open [Postman](https://www.postman.com/).
2. Create a new request and set the method:
   - **GET** `http://localhost:5000/api/users` → Fetch all users
   - **GET** `http://localhost:5000/api/users/1` → Fetch user with `id=1`
   - **POST** `http://localhost:5000/api/users`
     - Go to the **Body** tab and select **raw** → JSON
     - Enter:
       ```json
       {
         "name": "Jane Doe",
         "email": "janedoe@example.com",
         "age": 28
       }
       ```
   - **PUT** `http://localhost:5000/api/users/1`
     - Enter:
       ```json
       {
         "name": "Jane Smith"
       }
       ```
   - **DELETE** `http://localhost:5000/api/users/1`
3. Click **Send** to test the API responses.

## Performance Benchmark Analysis

### Apache Benchmark (ab)

Test Run:

```sh
ab -n 100 -c 10 http://localhost:5000/api/users
```

**Results:**

| Metric            | Value         |
| ----------------- | ------------- |
| Total Requests    | 100           |
| Concurrency Level | 10            |
| Time Taken        | 0.174 sec     |
| Failed Requests   | 0             |
| Requests/sec      | 575.81        |
| Time per Request  | 17.367 ms     |
| Transfer Rate     | 258.66 KB/sec |

The results indicate a high-performance API with a response time under **18ms** per request and no failed requests.

## Conclusion

This User Management API provides a robust, secure, and scalable solution for managing users with CRUD functionalities. Future enhancements could include authentication and authorization mechanisms.

---

**Author:** Kukil Phukan **Date:** March 2025
