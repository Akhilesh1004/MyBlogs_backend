require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
const postRoutes = require('./routes/post')
const commentRoutes = require('./routes/comment')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const multer = require('multer')
const path = require('path')

const app = express()
app.use(express.json())
app.use('/images', express.static(path.join(__dirname, "/images")))
app.use(cors({origin:"https://myblogs-6uj8.onrender.com", credentials:true}))
app.use(cookieParser())
app.use('/api/user', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/comments', commentRoutes)

const storage1 = multer.diskStorage({
    destination:(req, file, fn)=>{
        fn(null, path.join(__dirname, "images"))
    },
    filename:(req, file, fn)=>{
        fn(null, req.body.img)
    }
})

const upload = multer({storage:storage1})
app.post('/api/upload', upload.single('file'), (req, res)=>{
    //console.log('File uploaded:', req.body);
    res.status(200).json('Image has been uploaded successfully')
})

mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        app.listen(process.env.PORT, ()=>{
            console.log('connect to db and listening on port', process.env.PORT)
        })
    })
    .catch((error)=>{
        console.log(error)
    })
