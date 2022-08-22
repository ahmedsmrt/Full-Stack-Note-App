const express = require('express');
const router = express.Router();
const Note = require('../models/notesModel')
const {createNote, getNote, getNotes, updateNote, deleteNote} = require('../controllers/noteController')


// Get all Notes
router.all("/",(req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    next();
})

router.get("/", getNotes)

// Get Single Note
router.get('/:id',getNote)

// POST a new workout
router.post("/", createNote)

// DELETE a new workout
router.delete("/:id",deleteNote)

// Update a new workout
router.patch("/:id",updateNote)



module.exports = router