const AboutModel = require('../models/About')
const BlogModel = require('../models/Blog')

class FrontController {

    static home = async (req, res) => {
        try {
            const blogs = await BlogModel.find().sort({_id:-1}).limit(4)
            res.render('home', {blogs})
            // console.log(blogs)
        } catch (error) {
            console.log(error)
        }
    }

    static about = async(req, res) => {
        try {
            const about = await AboutModel.findOne()
            res.render('about', {about})
        } catch (error) {
            console.log(error)
        }
     
    }

   

    static contact = (req, res) => {
        res.render('contact')
    }


    static blog =async (req, res) => {
        try {
            const blogs = await BlogModel.find().sort({_id: -1})
            res.render('blog', {blogs})
        } catch (error) {
            console.log(error)
        }
    }

    static category =async (req, res) => {
        try {
           
            res.render('category')
        } catch (error) {
            console.log(error)
        }
    }



    static login = async(req, res) => {
        try {
            res.render('login', {message:req.flash('error')})
        } catch (error) {
            console.log(error)
        }
    }

    static register = (req, res) => {
       try {
        res.render('register', {message:req.flash('error')})
       } catch (error) {
        console.log(error)
       }
    }







    static blogDetails = async (req, res) => {
        try {
            const {id} = req.params
        const details = await BlogModel.findById(id)
        const recentBlogs = await BlogModel.find().limit(6)
        // const category = await BlogModel.CategorModel.find()

        res.render('readMore', {details, recentBlogs})
        } catch (error) {
            console.log(error)
        }
    }

}
module.exports = FrontController