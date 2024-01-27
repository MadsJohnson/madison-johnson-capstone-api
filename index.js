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
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;


function authorize(req, res, next) {
  // Get the token from the Authorization header
  const authHeader = req.header('Authorization');

  // Check if the token is not provided
  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized - Token not provided' });
  }

  // Remove the "Bearer " prefix from the Authorization header
  const token = authHeader.replace('Bearer ', '');

  try {
    // Verify and decode the token using the secret key
    const decoded = jwt.verify(token, secretKey);

    // Place the decoded contents on req.decoded
    req.decoded = decoded;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    // Handle token verification errors
    return res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
}

app.use(express.json());

// Use CORS middleware
app.use(cors());


app.use(authorize);



// Signup endpoint
app.post('/signup', async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: 'Bad Request - Request body is missing or empty' });
    }
     // Get the token from the Authorization header
     const authHeader = req.header('Authorization');
     const token = authHeader.replace('Bearer ', '');
 
     // Verify and decode the token using the secret key
     const decoded = jwt.verify(token, secretKey);
 
     // Place the decoded contents on req.user
     req.user = decoded;

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
      // Passwords match

      // Generate a JWT token
      const token = jwt.sign(
        { userId: user.user_id, username: user.username, name: user.name },
        secretKey, // Use secret key to sign the token
        { expiresIn: '1h' } // Token expiration time
      );

      // Return the token in the response
      res.json({ token });
    } else {
      // Invalid credentials
      res.status(401).json({ error: 'Invalid login credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/profile', authorize, async (req, res) => {
  console.log('Authorization header:', req.headers.authorization);
  const userId = req.decoded.userId;

  try {
    const user = await knex('users').where({ user_id: userId }).first();

    if (user) {
      // If user is found, send relevant information
      res.json({
        userId: user.user_id,
        username: user.username,
        name: user.name,
      });
    } else { 
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
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