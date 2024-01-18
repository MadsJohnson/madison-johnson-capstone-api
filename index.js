const express = require("express");
const cors = require("cors");
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 8080;
const todoRouter = require("./routes/todo-routes");
const notesRouter = require("./routes/notes-routes");
const agendaRouter = require("./routes/agenda-routes")
const prioritiesRouter = require("./routes/priorities-routes")
const bcrypt = require('bcrypt');
const saltRounds = 10;
const knex = require('knex')(require('./knexfile'));
// const jwt = require('jsonwebtoken');



app.use(express.json());

// Use CORS middleware
app.use(cors());


// Signup endpoint
app.post('/signup', async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: 'Bad Request - Request body is missing or empty' });
    }

    const { username, name, password } = req.body;

    // Check if username is already taken
    const existingUser = await knex('users').where({ username }).first();
    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert user data into the database
    await knex('users').insert({
      username,
      name,
      password: hashedPassword,
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await knex('users').where({ username }).first();

    if (user && await bcrypt.compare(password, user.password)) {
      // Passwords match, consider the user authenticated
      res.json({ success: true });
    } else {
      // Invalid credentials
      res.status(401).json({ error: 'Invalid login credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.get("/", (req, res) => {
  res.send("Welcome to Our API");
});

// Use the todoRouter for the / route
app.use("/todo", todoRouter);

// Use the notesRouter for the / route
app.use("/notes", notesRouter);

// Use the agendaRouter for the / route
app.use("/agenda", agendaRouter);


// Use the agendaRouter for the / route
app.use("/priorities", prioritiesRouter);

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});