const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({

    categoryName: {
        type: String,
        require: true
    }
},
{
    timestamps: true
}
)

const CategoryModel = mongoose.model('Category', CategorySchema)

module.exports = CategoryModel;