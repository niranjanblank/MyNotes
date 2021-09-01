const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

JWT_SECRET='somesecretkey'
JWT_EXPIRES_IN='20m'

const createToken = id => {
    return jwt.sign({id: id}, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN
    })
}

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

const login = async (req,res) => {
    if(req.body.jwtToken){
        console.log(req.body.jwtToken)
        jwt.verify(req.body.jwtToken, JWT_SECRET, async( err, decodedToken)=>{
            if(err){
                console.log("Validation failed")
            }
            else{
                console.log(decodedToken)
                const user = await User.findOne({_id: decodedToken.id})
                console.log(user)
                res.json({
                    message: 'success',
                    loggedIn: true,
                    userID: user._id,
                })
            }

        })
    }
    else{
        let username = req.body.username
        let password = req.body.password
    
        const user = await User.findOne({username: username})
    
        if(user && await user.verifyPassword(password,user.password))
        {
             const token = createToken(user._id)
             maxAge=24*60*10 
            // res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge*1000}) //expectrs maxage in millisecond
                // res.status(201).json({
                //     message: 'Login successful',
                //     token: token
                // })
            res.json({
                message: 'success',
                loggedIn: true,
                userID: user._id,
                accessToken: token
            })
          
        }
        else{
            res.json({
                message: 'Login not successful',
                loggedIn: false
    
            })
        }
    }
    

   
}


exports.signup = signup
exports.login = login