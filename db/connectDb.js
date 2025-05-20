const mongoose = require('mongoose')
const url = "mongodb://127.0.0.1:27017/BlogProject"

const connectDb = () => {
    return mongoose.connect(url)
   .then(() => {
    console.log("database connected")
   })
   .catch((err) => {
    console.log(err)
   })
}

module.exports = connectDb;
