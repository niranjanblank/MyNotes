const express = require('express')
const noteController = require('../controllers/noteController')

const router = express.Router()

router.route('/')
    .post(noteController.createNote)
    .get(noteController.getNote)

module.exports= router