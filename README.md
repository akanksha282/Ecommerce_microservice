## 🛒 E-Commerce Microservices Backend

A e-commerce backend system built using Node.js, Express, and MongoDB following the microservices architecture.It includes two core services: User Service and Order Service, with inter-service communication.

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

### 📁 Key Files

| File Path                        | Description                                      |
|----------------------------------|--------------------------------------------------|
| `userservice/server.js`         | Entry point for User Service                    |
| `orderservice/server.js`        | Entry point for Order Service                   |
|  `axiosWithRetry.js`      | Axios instance with retry logic for communication |
| `userservice/routes/userRoutes.js` | All user-related API routes                  |
| `orderservice/routes/orderRoutes.js` | All order-related API routes              |

## Api Endpoints
### 📌 User Service - API Endpoints

| Method | Endpoint                   | Description                      |
|--------|----------------------------|----------------------------------|
| POST   | `api/user`                | Register a new user              |
| POST   | `api/user/login`                   | User login and JWT generation    |
| GET    | `api/user/:id`               | Get user details by ID           |
| DELETE | `api/user/:id`               | Delete user by ID and notify Order Service |


### 📦 Order Service - API Endpoints

| Method | Endpoint                   | Description                      |
|--------|----------------------------|----------------------------------|
| POST   | `api/order`                  | Create a new order               |
| GET    | `api/order/:id`              | Get order details by UserID          |
| DELETE | `api/order/:id`                | Delete all orders of a user       |

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

| Requirement                       | Fulfilled |
| --------------------------------- | --------- |
| Microservices architecture        | ✅         |
| Separate DBs per service          | ✅         |
| Inter-service communication       | ✅         |
| JWT authentication                | ✅         |
| Retry mechanism for HTTP failures | ✅         |
| Clean code and modular structure  | ✅         |


### Postman Testing
Creating User
<img width="1920" height="1080" alt="Screenshot (584)" src="https://github.com/user-attachments/assets/96b6e8b8-a1b2-4ee4-95a1-807438b11058" />
Login User
<img width="1920" height="1080" alt="Screenshot (585)" src="https://github.com/user-attachments/assets/c760940a-81a3-49be-86b3-4d7c899cdc50" />
Get User By UserID
<img width="1920" height="1080" alt="Screenshot (581)" src="https://github.com/user-attachments/assets/339dbfaa-76e8-419a-8713-04fe12e3e0a8" />
Creating Order
<img width="1920" height="1080" alt="Screenshot (580)" src="https://github.com/user-attachments/assets/35547186-b295-46c2-9ead-ac1789395828" />
Order info by UserID
<img width="1920" height="1080" alt="Screenshot (582)" src="https://github.com/user-attachments/assets/9d8a438e-d887-4e93-a19b-cca2bb22b080" />
Delete User by ID
<img width="1920" height="1080" alt="Screenshot (583)" src="https://github.com/user-attachments/assets/5c3f2180-426a-478a-a686-6efbb9468169" />
Verifying if deleted user still have order entry
<img width="1920" height="1080" alt="Screenshot (586)" src="https://github.com/user-attachments/assets/7b20a239-91fa-424f-9d6d-a48ed3ef1e74" />













