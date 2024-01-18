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



app.use(express.json());

// Use CORS middleware
app.use(cors());


const users = {};

app.post('/signup', async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: 'Bad Request - Request body is missing or empty' });
    }
    const { username, name, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    users[username] = {
      name,
      password: hashedPassword,
    };
    console.log('User added:', users[username]);
    res.json({ success: true });
  } catch (error) {
    console.error('Error hashing password:', error);
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