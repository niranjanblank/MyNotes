const express = require('express')
const noteController = require('../controllers/noteController')

const router = express.Router()

router.route('/')
    .post(noteController.createNote)
router.route('/delete/:id')
    .delete(noteController.deleteNote)
router.route('/:userID').get(noteController.getNote)

module.exports= router