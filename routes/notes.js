// This code is adapted from Student exercise 24
const notes = require("express").Router();
const { readFromFile, readAndAppend } = require("../helpers/fsUtils");
const uuid = require("../helpers/uuid");

// GET Route for retrieving Notes
notes.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// DELETE Route for deleting Notes
notes.delete("/:id", (req, res) => {
  if (req.params.id) {
    const noteID = req.params.id;
    console.log(noteID);
    res.json(noteID);
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
