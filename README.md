
# Daily Plan App by Madison Johnson

Welcome to the Daily Planner App! This simple yet effective app helps you organize your daily tasks and schedule efficiently.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Features

- *Task Management:* Easily add, edit, and delete tasks for each day.
- *Date Selection:* Navigate between different dates to plan your schedule for the day.
- *User-Friendly Interface:* Intuitive design for a seamless planning experience.

## Prerequisites

Make sure you have the following installed:

- **Node.js**
- **npm (Node Package Manager)**
- **MySql**

## Technologies Used

- **React:** A JavaScript library for building user interfaces.
- **Axios:** A promise-based HTTP client for making API requests.
- **Knex.js:** A SQL query builder for Node.js that is used for interacting with MySQL databases in the backend of the Daily Planner App. Knex provides a clean and flexible syntax for building queries and managing database migrations.

## Dependencies

Some key dependencies used:

- **react-router-dom:** For handling navigation and routing in a React app.
- **useState and useRef hooks:** Used for managing state and creating references within React components.

For a complete list of dependencies, please refer to the `package.json` file.

## MySQL Database Setup

The Daily Planner App uses a MySQL database to store user data. Follow the steps below to set up the database and run migrations:

1. Install MySQL on your machine if not already installed.

2. Create a new MySQL database for the Daily Planner App.

3. Obtain the MySQL connection details (host, username, password, database name) and create a .env file in the root of your project using the  `.env.sample` file

4. Navigate to the project directory in your terminal.

5. Run the following commands to set up the database and run migrations:

```bash
# Install necessary dependencies
npm install

# Run database migrations
npm run migrate

```


### React App Set Up

1. Clone the repository:

```bash 
git clone https://github.com/your-username/daily-planner-app.git
```

2. Instal Dependencies 
```bash
cd daily-planner-app and instal dependencies 
npm instal
```

3. Start the application
```bash
npm start
```
 
4. Usage
Open your browser and navigate to http://localhost:3000.
Start planning your day!


## License
This project is licensed under the MIT License.

## Acknowledgments
Special thanks to Brainstation TAs and classmates for the guidance and support during the development of this app.

Happy planning!