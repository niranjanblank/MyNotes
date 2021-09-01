
const mongoose = require('mongoose')
const User = require('../models/userModel')
const Note = require('../models/noteModel')
const createNote = async (req,res) =>{
    let title = req.body.title
    let details = req.body.details
    let userId = await User.findById(req.body.userId)
    // console.log(userData._id)
    try{
        const noteData = await Note.create({title,details,userId})
        res.json({
            message: "Successful",
            data:{
                title,details,userId
            }
            
        })
    }
    catch(err){
        res.json({
            message: "Not successful",
            error: err.message
        })
    }
    
    // const note = 
}
const getNote = async (req,res) => {
    const data = await Note.find({userId: req.params.userID})
    res.json(data)
}

const deleteNote = async (req,res) => {
    const data = await Note.findOneAndDelete({_id:req.params.id})
    res.json(data)
}

exports.createNote = createNote;
exports.getNote = getNote;
exports.deleteNote = deleteNote