const Note = require('../models/notesModel')
const mongoose = require('mongoose')

// Get all note
const getNotes = async (req,res) => {
    const notes = await Note.find({}).sort({createdAt: -1})

    res.status(200).json(notes)
}


// Get a single note
const getNote = async (req,res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Note does not exist!"})
    }
    const note = await Note.findById(id)

    if(!note) {
        return res.status(404).json({error: 'Note does not exist!'})
    }

    res.status(200).json(note)
}

// Create a new note
const createNote = async (req,res) => {
    const {primaryEmotion, message} = req.body


    let emptyFields = [];

    if(!primaryEmotion) {
        emptyFields.push('primaryEmotion')
    }

    if(!message) {
        emptyFields.push('message')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({error: "Please fill in all the fields!", emptyFields})
    }

    // Add the document to the database
    try{
        const note = await Note.create({primaryEmotion, message})
        res.status(200).json(note)
    }catch(error) {
        res.status(400).json({error: error.message})
    }
}



//  Delete a note
const deleteNote = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Note does not exist!"})
    }

    const note = await Note.findOneAndDelete({_id: id})

    if(!note) {
        return res.status(400).json({error: 'Note does not exist!'})
    }

    res.status(200).json(note)
}



//  Update a note
const updateNote = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Note does not exist!"})
    }

    const note = await Note.findOneAndUpdate({_id: id}, {...req.body})

    if(!note) {
        return res.status(400).json({error: 'Note does not exist!'})
    }

    res.status(200).json(note)
}



module.exports = {
    createNote,
    getNotes,
    getNote,
    updateNote,
    deleteNote
}