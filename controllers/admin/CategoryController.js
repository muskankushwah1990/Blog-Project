const CategoryModel = require('../../models/Category');
const { category } = require('../FrontController');

class CategoryController {


    static categoryInsert = async(req, res) => {
        try {
            // console.log(req.body.category)
            const {category} = req.body
            const result =  new CategoryModel({
                categoryName: category,    //categoryName is the name of model cateogry
            })

            const categoryResult = await result.save()
            res.redirect("/category")
            // console.log(categoryResult)
        } catch (error) {
            console.log(error)
        }
    }

    static categoryDisplay = async(req, res) => {
        try {
            const displayCategory = await CategoryModel.find()
            res.render('admin/category/display', {displayCategory})
        } catch (error) {
            console.log(error)
        }
    }

    static categoryView = async(req, res) => {
        try {
            const {id} = req.params
            const viewCategory = await CategoryModel.findById(id)
            res.render('admin/category/view', {viewCategory})

        } catch (error) {
            console.log(error)
        }
    }

    static categoryEdit = async(req, res) => {
        try {
            const {id} = req.params
            const editCategory = await CategoryModel.findById(id)
            res.render('admin/category/edit', {editCategory})
        } catch (error) {
            console.log(error)
        }
    }

    static categoryUpdate = async(req, res) => {
        try {
            const {id} = req.params
            const {category} = req.body
            const updateCategory = await CategoryModel.findByIdAndUpdate(id, {
                categoryName: category, 
            })
            res.redirect('/admin/category/display')
        } catch (error) {
            console.log(error)
        }
    }

    static categoryDeleted = async(req, res) => {
        try {
            const {id} = req.params
            await CategoryModel.findByIdAndDelete(id)
            res.redirect('/admin/category/display')
        } catch (error) {
            console.log(error)
        }
    }




}

module.exports = CategoryController;