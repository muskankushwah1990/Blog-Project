const ContactModel = require('../../models/Contact')

class ContactController {

    static insertContact = async(req, res) => {
        try {
            // console.log(req.body)
            const {name, email, phone, message} = req.body
            const result = new ContactModel({
                name,
                email,
                phone,
                message
            })

            const contactInsert = await result.save()
            // console.log("contact insert", contactInsert)
            res.redirect('/contact')

        } catch (error) {
            console.log(error)
        }
    }

    static displayContact = async(req, res) => {
        try {
            const contactDisplay = await ContactModel.find()
            // console.log(contactDisplay)
            res.render('admin/contact/display', {contactDisplay})
        } catch (error) {
            console.log(error)
        }
    }

    static deleteContact = async(req, res) => {
        try {
           const {id} = req.params
           await ContactModel.findByIdAndDelete(id)
           console.log("deleted")
        } catch (error) {
            console.log(error)
        }
    }




}

module.exports = ContactController