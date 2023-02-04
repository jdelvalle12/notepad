const express = require('express');
const path = require('path');
const fs = require('fs');
const noteData = require('./db/notes.json');
const uuid = require('./helpers/uuid');
const { clog } = require('./middleware/clog');

// const api = require('./routes/notes.js');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);


// Import custom middleware, "cLog"
app.use(clog);

app.use(express.static('public'));


app.get('/', (req, res) =>
  res.sendFile(path.join(_dirname, '/public/index.html'))
  );


app.get('/api/db/notes.json', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);


// GET request for notes
app.get('/api/db/notes.json', (req, res) => {
  console.info(`GET /api/db/notes.json`);
  res.status(200).json(notes);
});

app.get('/api/db/notes', (req, res) => res.json(noteData));

// POST request to add a note
app.post('/api/db/notes', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a note`);

  // Destructuring assignment for the items in req.body
  const { note } = req.body;

  // If all the required properties are present
  if (note && title) {
    // Variable for the object we will save
    const newNote = {
      note,
      title,
      note_id: uuid(),
    };

    const response = {
      status: 'success',
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting a note');
  }
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost: ${PORT}`)
);

