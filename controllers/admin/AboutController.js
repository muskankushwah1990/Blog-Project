const AboutModel = require('../../models/About')
const cloudinary = require('cloudinary')
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    // secure: true
})

class AboutController  {

    static insert = async(req, res) => {
        try {
            // console.log(req.body)
            const {description, image} = req.body
            // console.log(req.files.image)
            const file = req.files.image
            const aboutImage = await cloudinary.uploader.upload(file.tempFilePath, {
                foler: "AboutBlog"
            })



            const about = new AboutModel({
                description,
                image: {
                    public_id: aboutImage.public_id,
                    url: aboutImage.secure_url
                }
            })

            const result = await about.save()
            // console.log(result)
            res.redirect('/admin/about/display')

        } catch (error) {
            console.log(error)
        }

    
    }


    static displayAbout = async(req, res) => {
        try {
            const display = await AboutModel.findOne()
            res.render('admin/about/display', {display})
        } catch (error) {
            console.log(error)
        }
    }

    static editAbout = async(req, res) => {
        try {
          const edit = await AboutModel.findById(req.params.id)
          res.render('admin/about/edit', {edit})
          // console.log(edit)
        } catch (error) {
          console.log(error)
        }
      }

    static updateAbout = async(req, res) => {
        try {
            //get image by id
            const {id} = req.params
            const {description, image} = req.body
            const ImageId = await AboutModel.findById(id)
            const imageDel = ImageId.image.public_id
             await cloudinary.uploader.destroy(imageDel)
             console.log("deleted image", imageDel)

            //upload image
            const file = req.files.image
            const newImg = await cloudinary.uploader.upload(file.tempFilePath, {folder: "NewAboutImg"})
            console.log(newImg)

            //update
           
            const updateResult = await AboutModel.findByIdAndUpdate(id, {
                description: description,
                image: {
                    public_id: newImg.public_id,
                    url: newImg.secure_url
                }
            })
            console.log(updateResult)
            res.redirect('/admin/about/display')

        } catch (error) {
            console.log(error)
        }
    }

    static deletedAbout = async(req, res) => {
        try {
            const {id} = req.params
            const deleted = await AboutModel.findByIdAndDelete(id)
            console.log(deleted)
            // res.redirect('/admin/about/display')
        } catch (error) {
            console.log(error)
        }
    }


}

module.exports = AboutController