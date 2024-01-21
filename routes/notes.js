// This code is adapted from Student exercise 24
const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET Route for retrieving Notes
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});

// POST Route for submitting Notes
notes.post('/', (req, res) => {
  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    readAndAppend(newNote, './db/db.json');

    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
  } else {
    res.json('Error in posting new Note');
  }
});

// GET request for a single Note
// notes.get('/:id', (req, res) => {
//     console.log(req.params.id);
//     if (req.params.id) {
//       console.info(`${req.method} request received to get a single note`);
//       const noteId = req.params.id;
//       const {title,text,id} = req.body;
//       console.log(title, text, noteId);
//       readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
//   }
// });
// GET request for a single review
notes.get('/:id', (req, res) => {
    if (req.params.id) {
      console.info(`${req.method} request received to get a single a review`);
      const notesId = req.params.id;
          //res.status(200).json(notesId);
          readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
          console.log(notes.length);
          return;
        }
      }
    );

module.exports = notes;