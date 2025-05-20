const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        require: true
    },
    message: {
        type: String,
        require: true
    },
    
},
{
    timestamps: true
}
)

const ContactModel = mongoose.model('Contact', ContactSchema)

module.exports = ContactModel;