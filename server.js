// Import express package
const express = require('express');
const path = require('path');
const fs = require('fs');
// Require the JSON file and assign it to a const called `noteData`
const noteData = require('./db/notes.json');
const uuid = require('./helpers/uuid');
const { clog } = require('./middleware/clog');


const PORT = process.env.PORT || 3001;
// Initialize our app variable by setting it to the value of express()
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Import custom middleware, "cLog"
app.use(clog);

app.use(express.static('public'));

// GET Route for homepage
// app.get('/notes', (req, res) =>
//   res.sendFile(path.join(_dirname, '/public/index.html'))
//   );

// GET Route for notes page
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);


// GET request for notes
app.get('/api/notes', (req, res) => {
  console.info(`GET /notes`);
  res.status(200).json(notes);
});
// res.json() allows us to return JSON instead of a buffer, string, or static file
app.get('/api/notes', (req, res) => res.json(noteData));

// POST request to add a note
app.post('/api/notes', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a note`);

  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Const for the object we will save
    const newNote = {
      title,
      text,
      id: uuid(),
    };

// Obtain existing notes
fs.readFile('/api/notes', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
  } else {
    // Convert string into JSON object
    const parsedNotes = JSON.parse(data);

    // Add a new note
    parsedNotes.push(newNote);
    console.log(newNote.id);
    // Write updated notes back to the file
    fs.writeFile(
      './db/notes.json',
      JSON.stringify(parsedNotes, null, 4),
      (writeErr) =>
        writeErr
          ? console.error(writeErr)
          : console.info('Successfully updated notes!')
    );
  }
});

const response = {
  status: 'success',
  body: newNote,
};

console.log(response);
res.status(201).json(response);
} else {
  res.status(500).json('Error in posting note');
}
});
// Wildcard route to direct users to a index.html page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);
//Route to direct users to a notes.html page
// app.get('/notes', (req, res) =>
//   res.sendFile(path.join(__dirname, '/public/notes.html'))
// );

//DELETE a note
app.delete('/api/notes/:id', (req, res) => {
  const note = req.params.id;
  console.log(noteData[1].id);
  for (let i = 0; i < noteData.length; i++) {
    if (note === noteData[i].id) {
      noteData.splice(i, 1)      
    }
  }
  fs.writeFile (
    './db/notes.json',
    JSON.stringify(noteData),
    (writeErr) => {
      if (writeErr) throw error;
      res.json('deleted note') 
    }
  );
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
