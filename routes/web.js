const express = require('express')
const router = express.Router()
const FrontController = require('../controllers/FrontController')
const TeacherController = require('../controllers/TeacherController')
const AdminController = require('../controllers/admin/AdminController')
const BlogController = require('../controllers/admin/BlogController')
const CategoryController = require('../controllers/admin/CategoryController')
const AboutController = require('../controllers/admin/AboutController')
const ContactController = require('../controllers/admin/ContactController')

const AdminAuth = require('../middleware/auth')
const ContactModel = require('../models/Contact')



//route
router.get('/login', FrontController.login)
router.get('/register', FrontController.register)
router.get('/', FrontController.home)
router.get('/about', FrontController.about)
router.get('/contact', FrontController.contact)
router.get('/blog', FrontController.blog)
router.get('/category', FrontController.category)
router.get('/blog-details/:id', FrontController.blogDetails)

//Teacher
router.get('/teacher/create', TeacherController.create)
router.get('/teacher/display', TeacherController.display)


//admin controller


//admin dashboard
router.get('/admin/dashboard',AdminAuth, AdminController.dashboard)
router.post('/', AdminController.register)
router.post('/login', AdminController.login)
router.get('/logout', AdminController.logout)

//admin/blog controller
router.get('/admin/blog/display',AdminAuth, BlogController.displayBlog)
router.post('/insertBlog',AdminAuth, BlogController.insertBlog)
router.get('/blogView/:id',AdminAuth, BlogController.viewSingleBlog)
router.get('/editBlog/:id',AdminAuth, BlogController.editBlog)
router.post('/updateBlog/:id',AdminAuth, BlogController.updateBlog)
router.get('/deleteBlog/:id',AdminAuth, BlogController.deleteBlog)


//admin/category controller
router.post('/category', CategoryController.categoryInsert)
router.get('/admin/category/display', CategoryController.categoryDisplay)
router.get('/admin/category/view/:id', CategoryController.categoryView)
router.get('/admin/category/edit/:id', CategoryController.categoryEdit)
router.post('/admin/category/update/:id', CategoryController.categoryUpdate)
router.get('/admin/category/delete/:id', CategoryController.categoryDeleted)

//admin/about controller
router.post('/about', AboutController.insert)
router.get('/admin/about/display', AboutController.displayAbout)
router.get('/admin/about/edit/:id', AboutController.editAbout)
router.post('/admin/about/update/:id', AboutController.updateAbout)
router.get('/admin/about/deleted/:id', AboutController.deletedAbout)


//admin contact controller
router.post('/contact', ContactController.insertContact)
router.get('/admin/contact/display', ContactController.displayContact)
router.get('/admin/contact/deleted/:id', ContactController.deleteContact)

module.exports = router