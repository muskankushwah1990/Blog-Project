const jwt = require('jsonwebtoken')
const AdminModel = require('../models/admin')

const chechAdminAuth = async(req, res, next) => {
    // console.log("hello middleware")
    const {token}= req.cookies;
    // console.log(token)
    if(!token){
        req.flash('error', 'Unauthorized User')
        res.redirect('/')
    }
    else{
        const data = jwt.verify(token, "tuniklachhuparustam")
        //console.log(data)
        const admin = await AdminModel.findOne({_id: data.id})
        // console.log(admin)
        req.admin = admin
        next()
    }
}

module.exports = chechAdminAuth;