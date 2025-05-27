const mongoose = require('mongoose')


const connectDb = () => {
    return mongoose.connect(process.env.LIVE_URL)
   .then(() => {
    console.log("live database connected")
   })
   .catch((err) => {
    console.log(err)
   })
}

module.exports = connectDb;
