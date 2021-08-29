const express = require('express')
const mongoose = require('mongoose')
const userRouter = require('./routes/userRoutes')
const noteRouter = require('./routes/noteRoutes')



const app = express()
app.use(express.json())


app.use('/',userRouter)
app.use('/notes',noteRouter)

// start the app
port = process.env.PORT || 5000


// connect to mongodb
mongoose.connect('mongodb://localhost:27017/mynotes', {useNewUrlParser: true})
        .then(
            console.log('DB Connected')
        )
        .catch(err=> console.log(err))

app.listen(port, ()=>{
    console.log(`App running on port ${port}`)
})