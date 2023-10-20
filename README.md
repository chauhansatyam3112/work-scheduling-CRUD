# work-scheduling-CRUD
# MERN Full Stack CRUD Work Scheduling app


## Table of Contents


## Features

- Create tasks with a title and description.
- Read the list of tasks.
- Update task details.
- Delete tasks from the list.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your development machine.
- MongoDB server up and running.
- A code editor of your choice (e.g., Visual Studio Code).
- Git installed on your machine.

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/mern-todo-app.git
```

2. Change directory to the project folder:

```bash
cd mern-todo-app
```

3. Install server dependencies:

```bash
cd server
npm install
```

4. Install client dependencies:

```bash
cd ../client
npm install
```

5. Create a `.env` file in the `server` directory and configure your MongoDB URI. Here's an example `.env` file:

```env
MONGODB_URI=your-mongodb-connection-uri
```

6. Start the server and client separately:

```bash
# In the server directory, start the Node.js server
cd ../server
npm start

# In the client directory, start the React app
cd ../client
npm start
```

7. Open your web browser and go to `http://localhost:3000` to access the TodoList app.

## Project Structure

The project structure is organized into two main directories:

- `client`: Contains the React client-side application.
- `server`: Contains the Node.js and Express.js server.

## Technologies Used

- **Frontend**:
  - React
  - React Router
  - Axios (for API requests)
  - Bootstrap (for styling)

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (Mongoose for ODM)
  - RESTful API endpoints

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository on GitHub.
2. Clone your forked repository to your local machine.
3. Create a new branch to work on your feature or bug fix.
4. Commit your changes.
5. Push your branch to your fork on GitHub.
6. Create a pull request against the main repository.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
