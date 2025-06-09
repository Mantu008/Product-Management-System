# Product Management System

A full-stack web application for managing products, built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## 🌟 Features

- **User Authentication**
  - Secure user registration and login
  - JWT-based authentication
  - Role-based access control (Admin/User)

- **Product Management**
  - Create, Read, Update, Delete (CRUD) operations for products
  - Product details including:
    - Product name
    - Product code
    - HSN code
    - Sales price
    - Purchase price

- **User Features**
  - User profile management
  - Shopping cart functionality
  - Favorites/wishlist
  - Order history

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS for styling
- React Router for navigation
- Context API for state management

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone [repository-url]
```

2. Install dependencies
```bash
# Install server dependencies
cd Server
npm install

# Install client dependencies
cd ../Client
npm install
```

3. Environment Setup
   - Create a `.env` file in the Server directory
   - Add the following variables:
     ```
     DATABASE_URL=your_mongodb_connection_string
     ACCESS_TOKEN_SECRET=your_jwt_secret
     PORT=2000
     ```

4. Start the application
```bash
# Start the server (from Server directory)
npm start

# Start the client (from Client directory)
npm run dev
```

## 📁 Project Structure

```
Product-Management-System/
├── Client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.jsx       # Main application component
│   │   └── index.jsx     # Application entry point
│   └── package.json
│
└── Server/                # Backend Node.js application
    ├── Models/           # MongoDB models
    ├── index.js         # Main server file
    └── package.json
```

## 🔒 Security Features

- Password hashing using bcrypt
- JWT token-based authentication
- Protected API routes
- Input validation
- CORS enabled

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- MongoDB for the database
- Express.js for the backend framework
- React.js for the frontend framework
- Node.js for the runtime environment
