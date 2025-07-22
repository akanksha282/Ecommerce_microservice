## 🛒 E-Commerce Microservices Backend

A e-commerce backend system built using Node.js, Express, and MongoDB following the microservices architecture.It includes two core services: User Service and Order Service, with inter-service communication and deployment via Render.

## 📌 Introduction

This project demonstrates how to build a scalable e-commerce backend with:

- Independent services for user and order management

- JWT-based user authentication

- Axios-based inter-service communication

- Deployment-ready setup (Render)

## ✨ Features
- 📦 User Service (Registration, Login, Get, Delete)
- 📦 Order Service (Create Order, Get Orders, Delete by User)
- 🔐 JWT Authentication for protected routes
- 🔄 Axios Retry for inter-service calls
- 📡 RESTful API communication between services
- ☁️ Cloud deployment via Render
- 🧩 Modular file structure with clean separation of concerns

## ✅ Prerequisites
- Node.js v18 or above
- MongoDB Atlas or local MongoDB instance
- Render account (for deployment)
- npm installed

## 🛠️ Running Locally
 ### 1 Install dependencies
   - cd userservice
       - npm install
   - cd orderservice
      - npm install
### 2 Set up environment variables
   - Create .env in both services:
      - userservice/.env
           - PORT=3000
           - MONGO_URI=your-mongodb-uri
           - JWT_SECRET=your_jwt_secret
           - API_Key=Your_Api_key
       - orderservice/.env
           - PORT=5000
           - MONGO_URI=your-mongodb-uri
           - JWT_SECRET=your_jwt_secret
           - API_Key=Your_Api_key
  ### 3 Start the services
    - cd userservice
       - node server.js
    - cd orderservice
        - node server.js
## 🚀 Running the Application
- User Service runs on: http://localhost:3000
- Order Service runs on: http://localhost:5000

## 🌐 Accessing the Application (Deployed)
 - ServiceEndpoint
    - User Service	https://userservice-7uoz.onrender.com
    - Order Service	 https://orderservices-hria.onrender.com

### 📁 Key Files

| File Path                        | Description                                      |
|----------------------------------|--------------------------------------------------|
| `userservice/server.js`         | Entry point for User Service                    |
| `orderservice/server.js`        | Entry point for Order Service                   |
|  `axiosWithRetry.js`      | Axios instance with retry logic for communication |
| `userservice/routes/userRoutes.js` | All user-related API routes                  |
| `orderservice/routes/orderRoutes.js` | All order-related API routes              |

## Api Endpoints
### 📌 User Service - API Endpoints(api/users)

| Method | Endpoint                   | Description                      |
|--------|----------------------------|----------------------------------|
| POST   | `/`                | Register a new user              |
| POST   | `/login`                   | User login and JWT generation    |
| GET    | `/:id`               | Get user details by ID           |
| DELETE | `/:id`               | Delete user by ID and notify Order Service |


### 📦 Order Service - API Endpoints(api/orders)

| Method | Endpoint                   | Description                      |
|--------|----------------------------|----------------------------------|
| POST   | `/`                  | Create a new order               |
| GET    | `/:id`              | Get order details by UserID          |
| DELETE | `/:id`                | Delete all orders of a user       |

### ⚙️ Function Descriptions
- registerUser → Validates input and registers new user.
- loginUser → Verifies credentials, returns JWT.
- getUserById → Fetches a user by ID (protected route).
- deleteUserById → Deletes user and informs Order Service.
- createOrder → Validates user and stores new order.
- getOrdersByUserId → Fetches all orders for a user.
- deleteOrdersByUserId → Deletes orders related to user (internal call).

### 🔐 Authentication & Security
- JWT-based auth for all user and order APIs.
- Internal API Key used for secure service-to-service communication during user deletion.

### 🗄️ Data Storage
- MongoDB database per service
- No shared schemas
- Services communicate only via HTTP APIs






