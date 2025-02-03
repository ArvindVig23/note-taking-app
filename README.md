# Note-Taking App

## Description

The Modern Note-Taking App is a full-stack application built with Node.js, Express, MongoDB Atlas, and Mongoose. It uses EJS for server-side rendering and Passport.js for secure local authentication. The app features a responsive design in which users can register, log in, and manage their personal notes (create, read, update, and delete).

## Features

- **User Registration & Login:** Secure authentication using Passport.js (local strategy).
- **Note Management:** Create, read, update, and delete personal notes.
- **Minimalist UI:** A clean and simple design for an uncluttered user experience.
- **Server-Side Rendering:** Dynamic content rendered using EJS templates.
- **Flash Messaging:** Provides clear success and error messages using connect-flash.

## Technologies Used

- **Backend:** Node.js, Express.js, MongoDB Atlas, Mongoose
- **Authentication:** Passport.js (local strategy), express-session, connect-flash
- **Templating:** EJS
- **Front-end:** HTML5, CSS3 (with Google Fonts for typography)

## Prerequisites

- **Node.js and npm:** Ensure you have the latest version installed.
- **MongoDB** (either a local MongoDB installation or a MongoDB Atlas account)
- **Git:** To clone the repository.

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/ArvindVig23/note-taking-app.git
cd note-taking-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
```

Notes:

- For MongoDB, you can use either:
  - MongoDB Atlas (cloud): Get your connection string from Atlas dashboard
  - Local MongoDB: Use `mongodb://localhost:27017/note-taking-app`
- Generate a secure SESSION_SECRET (you can use a cryptographically secure random string)

### 4. Start the Server

```bash
npm start
```

The application will be available at `http://localhost:3000`

## Development Notes

### Project Structure

```
note-taking-app/
├── middleware/        # Authentication middleware
├── models/           # MongoDB models (User, Note)
├── routes/           # Route handlers
├── views/            # EJS templates
├── public/           # Static assets
├── .env             # Environment variables
└── server.js        # Application entry point
```

### Difficulties & Lessons Learned

#### Difficulties Encountered

1. **Passport.js Configuration**

   - Getting local authentication right required properly setting up `passport.serializeUser` and `passport.deserializeUser`
   - Small mistakes often led to users not being recognized across sessions

2. **Session Management**

   - Managing sessions with express-session proved tricky, especially with short timeouts or cookie configurations
   - Ensuring the session secret is kept secure was critical

3. **Database Connectivity**

   - MongoDB Atlas:
     - Whitelisting IP addresses
     - Correctly formatting the URI
   - Local MongoDB:
     - Issues when MongoDB wasn't running
     - Default port conflicts

4. **Error Handling & Flash Messages**
   - Deciding how to inform users about errors vs. success states required consistent design and logic throughout the routes

### API Documentation

The application provides both web interfaces and API endpoints. Below are the key endpoints:

#### Authentication Endpoints

#### **POST /auth/register**

- **Purpose:** Register a new user.
- **Request Body (JSON or URL-encoded):**

  ```json
  {
    "username": "bob",
    "email": "bob@example.com",
    "password": "somepassword",
    "password2": "somepassword"
  }
  ```

- **Response:**
  On success, user is created and redirected to /auth/login.
  On failure, re-renders registration form with error messages.

#### **POST /auth/login**

- **Purpose:** Log in a user.
- **Request Body (JSON or URL-encoded):**

  ```json
  {
    "email": "bob@example.com",
    "password": "somepassword"
  }
  ```

- **Response:**
  On success, user is logged in and redirected to /notes.
  On failure, re-renders login form with error messages.

#### **GET /auth/logout**

- **Purpose:** Log out a user.
- **Response:**
  User is logged out and redirected to /auth/login.

### Notes Endpoints

#### **GET /notes**

- **Purpose:** Get all notes for the current user.
- **Response:**
  Renders the notes page with all user notes.

#### **POST /notes**

- **Purpose:** Create a new note.
- **Request Body:**

  ```json
  {
    "title": "My First Note",
    "content": "Some interesting content."
  }
  ```

- **Response:**
  On success, redirects to /notes with a success message.
  On failure, returns an error message.

#### **GET /notes/:id**

- **Purpose:** Get a specific note by ID.
- **URL Parameter:** :id (MongoDB ID of the note).
- **Response:** Renders the note page with the specified note.

#### **POST /notes/:id**

- **Purpose:** Update a note by ID.
- **Request Body:**

{
"title": "Updated Title",
"content": "Updated content"
}

- **Response:**
  On success, redirects to /notes with a success message.
  On failure, returns an error message.

#### **GET /notes/delete/:id**

- **Purpose:** Delete a note by ID.
- **URL Parameter:** :id (MongoDB ID of the note).
- **Response:** Redirects to /notes with a success message.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit changes (`git commit -am 'Add YourFeature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Create a Pull Request

## Troubleshooting

Common issues and their solutions:

1. **MongoDB Connection Issues**

   - Verify your MongoDB connection string
   - Ensure MongoDB is running (if using local instance)
   - Check network connectivity

2. **Authentication Problems**
   - Clear browser cookies
   - Verify email and password
   - Check session configuration

## License

This project is licensed under the MIT License - see the LICENSE file for details.

#### Lessons Learned

1. **Clarity in Routing & Middleware**

   - Separating route logic (auth routes, note routes, index routes) keeps the code organized and scalable

2. **Testing Endpoints Early**

   - Using a tool like Postman helped pinpoint issues with:
     - Request data
     - Authentication flow
     - Error handling
   - Early testing before finalizing the front-end saved development time

3. **Importance of Detailed Documentation**

   - A well-written README can save significant time for:
     - New collaborators
     - Future maintenance
     - Project setup

4. **Iterative UI Refinement**
   - Starting with a basic layout and iterating to a more minimalist design kept the project's focus on:
     - Core functionality first
     - Style and polish as final steps
