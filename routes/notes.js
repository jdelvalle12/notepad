// const notes = require('express').Router();
// const uuid = require('./helpers/uuid');
// const {
//   readFromFile,
//   readAndAppend,
//   writeToFile,
// } = require('./helpers/uuid');

// // GET Route for retrieving all the tips
// notes.get('/', (req, res) => {
//   readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
// });

// // GET Route for a specific tip
// notes.get('/:notes_id', (req, res) => {
//   const noteId = req.params.note_id;
//   readFromFile('./db/notes.json')
//     .then((data) => JSON.parse(data))
//     .then((json) => {
//       const result = json.filter((note) => note.note_id === noteId);
//       return result.length > 0
//         ? res.json(result)
//         : res.json('No tip with that ID');
//     });
// });

// // DELETE Route for a specific tip
// notes.delete('/:note_id', (req, res) => {
//   const noteId = req.params.note_id;
//   readFromFile('./db/notes.json')
//     .then((data) => JSON.parse(data))
//     .then((json) => {
//       // Make a new array of all tips except the one with the ID provided in the URL
//       const result = json.filter((note) => note.note_id !== noteId);

//       // Save that array to the filesystem
//       writeToFile('./db/notes.json', result);

//       // Respond to the DELETE request
//       res.json(`Item ${noteId} has been deleted 🗑️`);
//     });
// });

// // POST Route for a new UX/UI tip
// notes.post('/', (req, res) => {
//   console.log(req.body);

//   const { title, text, note } = req.body;

//   if (req.body) {
//     const newNote = {
//       title,
//       note,
//       text,
//       note_id: uuid(),
//     };

//     readAndAppend(newNote, './db/notes.json');
//     res.json(`Note added successfully`);
//   } else {
//     res.error('Error in adding note');
//   }
// });

// module.exports = notes;
