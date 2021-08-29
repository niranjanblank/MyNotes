const User = require('../models/userModel')


const signup = async (req, res) =>{

    let username=req.body.username
    let password= req.body.password

    try{
        const user = await User.create({username:username,password:password})
        res.json({
            message:'Complete'
        })
    }

    catch(err){
        res.json({message:'Failed',error: err})
    }
 
    
}

exports.signup = signup