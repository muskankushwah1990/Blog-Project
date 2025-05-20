const AdminModel = require("../../models/admin");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class AdminController {
  static dashboard = async (req, res) => {
    try {
        const {name, email} = req.admin
        res.render("admin/dashboard/dashboard", {name, email});
    } catch (error) {
        console.log(error)
    }
  };

  static register = async (req, res) => {
    try {
      //console.log(req.body)
      const { name, email, password, confirmpassword } = req.body;
      const admin = await AdminModel.findOne({ email: email });
      if (admin) {
        req.flash("error", "Email already exists");
        res.redirect("/");
      } else {
        if (name && email && password && confirmpassword) {
          if (password === confirmpassword) {
            const hashpassword = await bcrypt.hash(password, 10)
            const register = new AdminModel({
              name: name,
              email: email,
              password: hashpassword,
            });

            await register.save();
            res.redirect("/login");
          } else {
            req.flash("error", "Password and confirm password not match");
            res.redirect("/");
          }
        } else {
          req.flash("error", "All fields are required");
          res.redirect("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  static login = async (req, res) => {
    try {
        // console.log(req.body)
        const {email, password} = req.body
        if(email && password) {
            const admin = await AdminModel.findOne({email: email})
            if(admin != null) {
                const isMatched = await bcrypt.compare(password, admin.password)
                if(isMatched){
                    //generate token
                    const token = jwt.sign({
                        id: admin._id
                    }, "tuniklachhuparustam")
                    // console.log(token)
                    res.cookie('token', token)
                    res.redirect('/admin/dashboard')
                }
                else{
                    req.flash('error', 'Password incorrect')
                    res.redirect('/login')
                }
            }else{
                req.flash('error', 'Unauthorized User! please register')
                res.redirect('/login')
            }
        }
        else{
            req.flash('error', 'All fields are required')
            res.redirect('/login')
        }
    } catch (error) {
        console.log(error)
    }
  }

  static logout = async (req, res) => {
    try {
        res.clearCookie('token')
        res.redirect('/')
    } catch (error) {
        console.log(error)
    }
  }


}

module.exports = AdminController;
