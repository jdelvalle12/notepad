const express = require('express');
const path = require('path');
// Helper method for generating unique ids
const uuid = require('./helpers/uuid');
const notes = require('./db/notes');
const { clog } = require('./middleware/clog');

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import custom middleware, "cLog"
app.use(clog);

app.use(express.static('public'));
//GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET request for notes
app.get('/api/notes', (req, res) => {
  console.info(`GET /api/notes`);
  res.status(200).json(notes);
});

// GET a single note
app.get('/api/notes/:notes_id', (req, res) => {
  if (req.params.notes_id) {
    console.info(`${req.method} request received to get a single a note`);
    const noteId = req.params.note_id;
    for (let i = 0; i < notes.length; i++) {
      const currentNotes = notes[i];
      if (currentNotes.note_id === noteId) {
        res.json(currentNotes);
        return;
      }
    }
    res.status(404).send('Note not found');
  } else {
    res.status(400).send('Notes ID not provided');
  }
});

// POST request to add a notes
app.post('/api/notes', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a note`);

  // Destructuring assignment for the items in req.body
  const { note } = req.body;

  // If all the required properties are present
  if (note) {
    // Variable for the object we will save
    const newNote = {
      note: Math.floor(Math.random() * 100),
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

// // GET request for a specific review's upvotes
// app.get('/api/upvotes/:review_id', (req, res) => {
//   console.info(`${req.method} request received to get upvotes for a review`);
//   for (let i = 0; i < reviews.length; i++) {
//     const currentReview = reviews[i];
//     if (currentReview.review_id === req.params.review_id) {
//       res.status(200).json({
//         message: `The review with ID ${currentReview.review_id} has ${currentReview.upvotes}`,
//         upvotes: currentReview.upvotes,
//       });
//       return;
//     }
//   }
//   res.status(404).json('Review ID not found');
// });

// // POST request to upvote a review
// app.post('/api/upvotes/:review_id', (req, res) => {
//   if (req.body && req.params.review_id) {
//     console.info(`${req.method} request received to upvote a review`);
//     const reviewId = req.params.review_id;
//     for (let i = 0; i < reviews.length; i++) {
//       const currentReview = reviews[i];
//       if (currentReview.review_id === reviewId) {
//         currentReview.upvotes += 1;
//         res.status(200).json(`New upvote count is: ${currentReview.upvotes}!`);
//         return;
//       }
//     }
//     res.status(404).json('Review ID not found');
//   }
// });

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
