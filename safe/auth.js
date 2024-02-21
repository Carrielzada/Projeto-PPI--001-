export default function auth(req, res, next){
    if (req.session?.userlog){
        next()
    }
    else{
        res.redirect('/login.html')
    }
}