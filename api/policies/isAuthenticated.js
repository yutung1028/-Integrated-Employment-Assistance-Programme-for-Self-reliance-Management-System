module.exports = function(req, res, next) {
	// User is allowed, proceed to the next policy, 
  	// or if this is the last policy, the controller
    // Sockets
    if(req.isSocket)
    {
        if(req.session &&
            req.session.passport &&
            req.session.passport.user)
        {
            //Use this:
            
            // Initialize Passport
            // sails.config.passport.initialize()(req, res, function () {
            //     // Use the built-in sessions
            //     sails.config.passport.session()(req, res, function () {
            //         // Make the user available throughout the frontend
            //         //res.locals.user = req.user;
            //         //the user should be deserialized by passport now;
            //         next();
            //     });
            // });

            //Or this if you dont care about deserializing the user:
            req.user = req.session.passport.user;
            return next();

        }
        else{
            res.json(401);
        }


    }
    else if (req.isAuthenticated()) {
        PermissionService.checkUserPermissions(req.user, 2, 
            function() {
                req.user.upload = true;
                //console.log(req.user);
                return next();
            },
            function() {
                //console.log(req.user);
                return next();
            });
        
    }
    else{
        return res.redirect('/login');
    }
};