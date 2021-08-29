const Note = require('../models/noteModel')
const mongoose = require('mongoose')
const User = require('../models/userModel')

const createNote = async (req,res) =>{
    let title = req.body.title
    let details = req.body.details
    let userId = await User.findById(req.body.userId)
    // console.log(userData._id)
    try{
        const note = await Note.create({title,details,userId})
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
const getNote = (req,res) => {
    res.json({message: "Not created yet"})
}

exports.createNote = createNote;
exports.getNote = getNote;