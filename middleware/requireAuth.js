const jwt = require('jsonwebtoken')

const requireAuth =(req, res, next)=>{
    const token = req.cookies.token
    if(!token){
        return res.status(401).json("Authorization token required")
    }
    try{
        const data = jwt.verify(token, process.env.SECRET)
        req.user_id = data.id
        next()
    }catch(error){
        console.log(error);
        res.status(401).json({error: 'Request is not authorized'})
    }
}

module.exports = requireAuth