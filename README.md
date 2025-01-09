# Backend Project - Node.js & Express

## Overview
This project is a backend application built with Node.js and Express, providing user authentication, product management, and administrative capabilities. It supports secure password handling, token-based authentication, and password reset functionality.

---

## Features

### User Management
- **Create User**: Register a new user with secure password encryption.
- **Login**: Authenticate users using email and password.
- **Password Reset**: Allows users to reset their password securely.

### Admin Management
- **Admin Role**: Additional privileges for administrators to manage users and products.

### Product Management
- **Create Product**: Add new cleaning products to the inventory.
- **Update Product**: Modify details of existing products.
- **Delete Product**: Remove a product from the inventory.
- **Get Product**: Retrieve details of a specific product.

---

## Technologies Used
- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for building RESTful APIs.
- **JWT (JSON Web Tokens)**: Token-based authentication.
- **bcrypt**: Secure password encryption.

---

## How to Run

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set environment variables:**
   Create a `.env` file and configure the following variables:
   ```env
   PORT=3000
   MONGO_URI=<your_mongo_database_uri>
   JWT_SECRET=<your_jwt_secret>
   ```
4. **Start the server:**
   ```bash
   npm start
   ```

---

## API Endpoints

### **Auth Routes**
- `POST /auth/register` - Register a new user.
- `POST /auth/login` - User login.
- `POST /auth/reset-password` - Reset password.

### **Admin Routes**
- `GET /admin/users` - Get all users (admin only).

### **Product Routes**
- `POST /products` - Add a new product.
- `GET /products/:id` - Get product details by ID.
- `PUT /products/:id` - Update product by ID.
- `DELETE /products/:id` - Delete product by ID.

---

## License
This project is licensed under the MIT License.
