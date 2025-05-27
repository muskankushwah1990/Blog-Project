const BlogModel = require("../../models/Blog");
const cloudinary = require('cloudinary')
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    // secure: true
})

class BlogController {
  static displayBlog = async (req, res) => {
    try {
      const data = await BlogModel.find()
      // console.log(data)
      res.render("admin/blog/display", {data});
    } catch (error) {
      console.log(error)
    }
  };

  static insertBlog = async (req, res) => {
    try {
        // console.log(req.body)
        const {title, description, image} = req.body
        console.log(req.files.image)
        const file = req.files.image
        const myImage = await cloudinary.uploader.upload(file.tempFilePath, {
          folder:'blogImage'
        })
        // console.log(myImage)

       
        const result = new BlogModel({
            title,
            description,
            image: {
              public_id: myImage.public_id,
              url: myImage.secure_url
            }
        })
        const data = await result.save()
        console.log(data)
        res.redirect('/admin/blog/display')
    } catch (error) {
      console.log(error);
    }
  };


  static viewSingleBlog = async (req, res) => {
    try {
      // console.log(req.params.id)
      const {id} = req.params
      const view = await BlogModel.findById(id)
      console.log(view)
      res.render('admin/blog/view', {view})
    } catch (error) {
      console.log(error)
    }
  }

  static editBlog = async(req, res) => {
    try {
      const edit = await BlogModel.findById(req.params.id)
      res.render('admin/blog/edit', {edit})
      // console.log(edit)
    } catch (error) {
      console.log(error)
    }
  }

  static updateBlog = async (req, res) => {
    try {
      
      const {id} = req.params
      // console.log(req.body)
      //delete image for cloudinary
      const deletedBlog = await BlogModel.findById(id)
      const imageId = deletedBlog.image.public_id
      // console.log(imageId)
      await cloudinary.uploader.destroy(imageId)

     //update image
      const file = req.files.image
      const updatedImage = await cloudinary.uploader.upload(file.tempFilePath, {
        folder:'blogImage'
      })


      const {title, description} = req.body
      const update = await BlogModel.findByIdAndUpdate(id, {
        title: title,
        description: description,
        image: {
          public_id: updatedImage.public_id,
          url: updatedImage.secure_url
        }
      })
      await update.save()
      res.redirect('/admin/blog/display')
    
    } catch (error) {
      console.log(error)
    }
  }

  static deleteBlog = async (req, res) => {
    try {
      const {id} = req.params
      //deleted image for cloudinary
      const deltedBlog = await BlogModel.findById(id)
      const imageId = deltedBlog.image.public_id
      // console.log(imageId)
      await cloudinary.uploader.destroy(imageId)

      await BlogModel.findByIdAndDelete(id)
      res.redirect('/admin/blog/display')
    } catch (error) {
      console.log(error)
    }
  }




}

module.exports = BlogController;
