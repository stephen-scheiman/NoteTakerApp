// This code is adapted from Student exercise 24
const notes = require("express").Router();
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("../helpers/fsUtils");
const uuid = require("../helpers/uuid");

// GET Route for retrieving Notes
notes.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// DELETE Route for deleting Notes
notes.delete("/:id", (req, res) => {
  // is the request properly formed?
  if (req.params.id) {
    // this variable will hold our json data while we work on it
    let tmpArray = [];

    // noteId holds the UUID of the note we want to delete
    const noteId = req.params.id;

    // read the db.json file and then assign the elements to an array
    readFromFile("./db/db.json").then((data) => {
      tmpArray = JSON.parse(data);

      // create newArray from tmpArray filtered to remove the matching UUID
      const newArray = tmpArray.filter((note) => note.id !== noteId);

      // write newArray to the db.json file
      writeToFile("./db/db.json", newArray);

      // send a nice note mostly to fulfill the promise and prevent the app from hanging
      res.json(`Successfully deleted note with ID:${noteId}`);
    });
  }
});

// POST Route for submitting Notes
notes.post("/", (req, res) => {
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

    readAndAppend(newNote, "./db/db.json");

    const response = {
      status: "success",
      body: newNote,
    };

    res.json(response);
  } else {
    res.json("Error in posting new Note");
  }
});

module.exports = notes;
