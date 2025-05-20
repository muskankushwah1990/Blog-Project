const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
},
     {timestamps: true})

const AdminModel = mongoose.model("Admin", AdminSchema)

module.exports = AdminModel;