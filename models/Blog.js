const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({

    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    image: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        }
    }
},
{
    timestamps: true
}
)

const BlogModel = mongoose.model('Blog', BlogSchema)

module.exports = BlogModel;