const router = require('express').Router();

// Import modular routers for /notes
const notesRouter = require('./notes');

// Requests to /api/notes will be handled by the notesRouter
router.use('/notes', notesRouter);


module.exports = router;
