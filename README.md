# Photopia 📸

A full-stack photo storage and sharing application built using **React**, **Node.js**, **MySQL**, and styled with **Tailwind CSS**. Photopia allows users to securely upload, store, and share their photos with a clean and modern user interface.

---

## Author  
**Rehan Feroz Sayyed**

---

## Features  
- User authentication (Login/Registration).
- Secure JWT authentication.
- Upload photos to the platform.
- Simple, responsive UI built with Tailwind CSS.
- Dark mode for enhanced user experience.

---

## File Structure  

```
Photopia/
│
├── user-backend/                      # Backend code
│   ├── config/                        # Database configuration
│   │   └── db.js                      # MySQL database setup
│   ├── controllers/                   # Backend logic for authentication and file uploads
│   │   └── fileController.js          # Logic for handling file uploads
│   ├── models/                        # Models for user data and file storage
│   │   └── User.js                    # User model for authentication
│   ├── routes/                        # API routes for user management and file uploads
│   │   └── fileRoutes.js              # Routes for file upload functionality
│   │   └── jwtMiddleware.js           # Middleware to protect routes with JWT authentication
│   │   └── login.js                   # Login route
│   │   └── register.js                # Registration route
│   │   └── User.js                    # User API routes
│   ├── index.js                       # Entry point for the backend
│   ├── package.json                   # Backend dependencies and scripts
│   └── .env                           # Environment variables for the backend
│   └── database_setup.sql             # SQL Queries for the Database  
│
├── user-frontend/                     # Frontend code
│   ├── src/                           # React source code
│   │   ├── components/                # React components (Navbar, Footer, FileUpload, etc.)
│   │   ├── pages/                     # Pages for Home, Login, Register, etc.
│   │   ├── utils/                     # Helper functions (API calls)
│   │   ├── main.jsx                   # React entry point
│   │   ├── App.jsx                    # Main application component
│   │   └── index.css                  # Global styles
│   ├── tailwind.config.js             # Tailwind CSS configuration
│   ├── package.json                   # Frontend dependencies and scripts
│   └── vite.config.js                 # Vite configuration
│   ├── .env                           # Environment variables for the frontend
│   ├── index.html                     # HTML template for the frontend
│
├── README.md                          # Documentation for the project
└── LICENSE                            # License file

```

---

## Setup

Follow these steps to run the project locally:

## Database Setup  

To set up the database for the project, you can run the provided SQL script. This will create the necessary tables (`users` and `user_files`) for the application.

1. Download the [**database_setup.sql**](./user-backend/database_setup.sql) file from the repository.
2. Connect to your MySQL database.
3. Run the following commands in your MySQL client:

```sql
-- Create the database
CREATE DATABASE user_auth_system;

-- Use the database
USE user_auth_system;

-- Create the users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the user_files table
CREATE TABLE user_files (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

4. After running the above SQL commands, your database schema will be set up and ready to use with the application.

### Backend  

1. Navigate to the `user-backend/` directory:  
   ```bash
   cd user-backend
   ```

2. Install dependencies:  
   ```bash
   npm install
   ```

3. Create a `.env` file in the `user-backend/` directory and add:  
   ```env
   JWT_SECRET = your-secret-jwt-token
   DB_HOST= your-localhost (e.g., localhost)
   DB_USER= your-database-user (e.g., root)
   DB_PASSWORD= your-database-password
   DB_NAME= your-database-name
   ```

4. Start the backend server:  
   ```bash
   npm start
   ```

### Frontend  

1. Navigate to the `user-frontend/` directory:  
   ```bash
   cd user-frontend
   ```

2. Install dependencies:  
   ```bash
   npm install
   ```

3. Create a `.env` file in the `user-frontend/` directory and add:  
   ```env
   VITE_API_URL='http://localhost:5000'
   ```

4. Start the frontend development server:  
   ```bash
   npm run dev
   ```

---

## Technologies  

### Frontend  
- **React**  
- **Tailwind CSS**  
- **Vite**  
- **Axios**  

### Backend  
- **Node.js**  
- **Express.js**  
- **MySQL** (using Sequelize ORM)  
- **JWT** (JSON Web Tokens for authentication)

---

## Usage  

1. Start the backend server (refer to Setup > Backend).  
2. Start the frontend server (refer to Setup > Frontend).  
3. Open [http://localhost:5173](http://localhost:5173) in your browser to access the app.  

### Default Credentials for Offline Use  
For testing, offline usage, you can use the following credentials:  
- **Email:** `admin@gmail.com`  
- **Password:** `1234`  

--- 

## API Endpoints  

### Base URL: `http://localhost:5000/api/`

| Method | Endpoint            | Description                        |  
|--------|---------------------|------------------------------------|  
| POST   | `/login`             | Login a user and return a JWT token |  
| POST   | `/register`          | Register a new user               |  
| POST   | `/change-password`   | Change Password of the user       |  
| POST   | `/upload`            | Upload a photo                    |  
| GET    | `/files`             | Get the files of the logged-in user |  

---

## Screenshots  

### Login Page  
Minimalistic and user-friendly login page.  
![Login Page](https://i.ibb.co/R4fpJXw/image.png)

### Register Page  
Easy registration form to create a new account.  
![Register Page](https://i.ibb.co/SyhDjsC/image.png)

### Home Page  
A minimalistic UI to upload, store, and manage your photos.  
![Home Page 1](https://i.ibb.co/1TXbykt/image.png)
![Home Page 2](https://i.ibb.co/x8GWZkq/image.png)

---

## Host  

The application is hosted on Vercel (Frontend). However, the backend is not hosted. To access the application, use the following default credentials:  

- **Email:** `admin@gmail.com`  
- **Password:** `1234`  

You can view the application [here](https://photopia-one.vercel.app/).  

---

## Contributing

If you want to contribute to this project, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

For any questions or issues, please reach out to:

- **Email:** rehansayyed591@gmail.com
- **GitHub:** [Rehan Sayyed](https://github.com/rsayyed591)
