const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
// Schema for the model
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter username'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please enter password'],
        minlength: [6,"Minimum password length is 6 characters"]
    }
})

userSchema.pre('save', async function(next){
    // Only run this function if password was actually modified
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12)
    next()
})
//Inside mongoose.model, the name must of singular of the collection name in database
const User = mongoose.model('User',userSchema)

module.exports = User