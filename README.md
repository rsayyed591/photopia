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
![Login Page](https://i.ibb.co/Zm3JTyJ/Screenshot-2024-11-26-215451.png)

### Register Page  
Easy registration form to create a new account.  
![Register Page](https://i.ibb.co/Zm3JTyJ/Screenshot-2024-11-26-215451.png)

### Home Page  
A minimalistic UI to upload, store, and manage your photos.  
![Home Page](https://i.ibb.co/Zm3JTyJ/Screenshot-2024-11-26-215451.png)

---

## Host

The application is hosted on Vercel (Frontend) and a custom backend server. You can view it [here](https://photopia.vercel.app/).

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

---