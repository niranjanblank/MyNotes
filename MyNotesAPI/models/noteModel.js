const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true,'Please enter the title']
    },
    details: {
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: [true, 'Id is required']
    }
})

const Note = mongoose.model('Note',noteSchema)

module.exports = Note