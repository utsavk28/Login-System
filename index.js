const express = require("express")
const app = express()
const mongoose = require('mongoose')
const config = require('config')
const path = require('path')

// Connect to Db
const db = config.get('mongoURI')
mongoose.connect(db,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    },
    () => {
        console.log('Database connnected...');
    })

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api", require("./route/auth"))

// Serve static assests in production
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'))

    app.get('*',(req,res) => {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

const PORT = process.env.PORT || 5000


app.listen(PORT, () => {
    console.log('Server Running');
})