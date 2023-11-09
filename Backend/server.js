const express = require("express");
const dotnev = require("dotenv");
const mongoose = require("mongoose");
const UserRoute = require("./routes/UserRouter")
const AdminRoute = require("./routes/AdminRouter")
// const ItemRoute = require("./routes/ItemRouter")
const cors = require('cors')
dotnev.config({ path: './conf.env' })

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.CONSTR, {
    UseNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("connected")
    })

app.use('/user', UserRoute)
app.use('/admin', AdminRoute)


app.listen(8080, () => {
    console.log("connect port 8080")
})