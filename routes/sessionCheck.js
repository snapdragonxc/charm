// <--- PASSPORT SESSION CHECK --->
module.exports = function sessionCheck(req, res, next){
    if(req.isAuthenticated()){  // isAuthenticated is added by passport
        return next();
    } else {
        // console.log("authorization failure");
        //res.send(401, 'authorization failed');
        res.status(401).send('authorization failed')
    }
}