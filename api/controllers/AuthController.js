/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

module.exports = {
	
	_config: {
        actions: false,
        shortcuts: false,
        rest: false
    },

    login_view: function(req, res) {
        if (!req.user) {
            return res.view('login');
        } else {
            return res.redirect('/');
        }
    },

    login: function(req, res) {
        passport.authenticate('local', function(err, user, info) {
            if ((err) || (!user)) {
                return res.view('login', {message: err});
                // return res.send({
                //     message: info.message,
                //     user: user
                // });
            }
            req.logIn(user, function(err) {
                if (err) {
                    return res.view('login', {message: err});
                }
                ActivityMonitorService.markActivity(req.user, 1, '',function() {
                    res.redirect('/');
                });
                // return res.send({
                //     message: info.message,
                //     user: user
                // });
            });

        })(req, res);
    },

    logout: function(req, res) {
        req.logout();
        res.redirect('/login');
    }

};

