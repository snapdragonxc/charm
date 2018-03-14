// <--- SESSION CHECK --->
module.exports =  function(req, res, next){
	if(req.session.user){
		next();
	} else {
		res.send(401, 'authorization failed');
	}
};
