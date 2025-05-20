const express = require('express')
const app = express()
const port = 3000
const web = require('./routes/web')
const connectDb = require('./db/connectDb')
const fileUpload = require('express-fileupload')
const cloudinary = require('cloudinary')
const path = require('path')
const session = require('express-session')
const flash = require('connect-flash')

const cookieParser = require('cookie-parser')
app.use(cookieParser())

cloudinary.config({
    cloud_name: 'dg6g8fnii',
    api_key: '364626995131484',
    api_secret: 'HF5XJowO_L21gOejLPjOORKI_ts',
    // secure: true
})


connectDb();

app.use(express.urlencoded({extended: true}))

app.use(fileUpload({useTempFiles: true,  // tempFileDir: '/tmp'
    }))

app.use(session({
    secret: 'secret',
    cookie: {maxAge: 60000},
    resave: false,
    saveUninitialized: false
}))

app.use(flash())



//ejs setup
app.set('view engine', 'ejs')

app.set('views', path.join(__dirname, 'views'))
app.use(express.static("public"))







//route load
app.use('/', web)




//server create
app.listen(port, () => {
    console.log(`server is listening on localhost: ${port}`);
})